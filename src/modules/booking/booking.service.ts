import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateBookingDto } from './dto/create-booking.dto';

import { convertUTCToTimezone } from 'src/common/utils/timezone.util';




@Injectable()
export class BookingService {
  private readonly logger =
    new Logger(BookingService.name);

  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {

    const { parentId, offeringId } = createBookingDto;
    this.logger.log(
        `Creating booking for parent ${parentId}`,
    );

    return this.prisma.$transaction(async (tx) => {

      // CHECK PARENT

      const parent = await tx.parent.findUnique({
        where: {
          id: parentId,
        },
      });

      if (!parent) {
        throw new NotFoundException(
          'Parent not found',
        );
      }

      // CHECK OFFERING

      const offering = await tx.offering.findUnique({
        where: {
          id: offeringId,
        },
        include: {
          sessions: true,
        },
      });

      if (!offering) {
        throw new NotFoundException(
          'Offering not found',
        );
      }

      // CHECK DUPLICATE BOOKING

      const existingBooking =
        await tx.booking.findUnique({
          where: {
            parentId_offeringId: {
              parentId,
              offeringId,
            },
          },
        });

      if (existingBooking) {
        throw new BadRequestException(
          'Offering already booked',
        );
      }

      // GET EXISTING BOOKINGS

      const parentBookings =
        await tx.booking.findMany({
          where: {
            parentId,
          },
          include: {
            offering: {
              include: {
                sessions: true,
              },
            },
          },
        });

      // CONFLICT CHECKING

      for (const booking of parentBookings) {

        for (const existingSession of booking.offering.sessions) {

          for (const newSession of offering.sessions) {

            const hasConflict =
              newSession.startTimeUtc <
                existingSession.endTimeUtc
              &&
              newSession.endTimeUtc >
                existingSession.startTimeUtc;

            if (hasConflict) {
                this.logger.warn(
                    `Booking conflict for parent ${parentId}`,
                );

              throw new BadRequestException(
                'Booking conflict detected',
              );
            }
          }
        }
      }

      // CREATE BOOKING

      return tx.booking.create({
        data: {
          parentId,
          offeringId,
        },
        include: {
          parent: true,
          offering: {
            include: {
              sessions: true,
            },
          },
        },
      });
    });
  }

  async findAll() {

    return this.prisma.booking.findMany({
      include: {
        parent: true,
        offering: {
          include: {
            course: true,
            sessions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findParentBookings(parentId: number) {

    const parent = await this.prisma.parent.findUnique({
      where: {
        id: parentId,
      },
    });

    if (!parent) {
      throw new NotFoundException(
        'Parent not found',
      );
    }

    const bookings =
      await this.prisma.booking.findMany({
        where: {
          parentId,
        },
        include: {
          offering: {
            include: {
              course: true,
              sessions: true,
            },
          },
        },
      });

    return bookings.map((booking) => {

      return {
        id: booking.id,

        offering: {
          id: booking.offering.id,
          name: booking.offering.name,

          course: booking.offering.course,

          sessions:
            booking.offering.sessions.map(
              (session) => ({
                id: session.id,

                startTime:
                  convertUTCToTimezone(
                    session.startTimeUtc,
                    parent.timezone,
                  ),

                endTime:
                  convertUTCToTimezone(
                    session.endTimeUtc,
                    parent.timezone,
                  ),
              }),
            ),
        },
      };
    });
  }
}
