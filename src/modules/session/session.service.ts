import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

import { convertToUTC } from '../../common/utils/timezone.util';

@Injectable()
export class SessionService {

  constructor(private prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {

    const offering = await this.prisma.offering.findUnique({
      where: {
        id: createSessionDto.offeringId,
      },
    });

    if (!offering) {
      throw new NotFoundException(
        'Offering not found',
      );
    }

    const startUtc = convertToUTC(
      createSessionDto.startTime,
      offering.timezone,
    );

    const endUtc = convertToUTC(
      createSessionDto.endTime,
      offering.timezone,
    );

    // VALIDATE TIME RANGE

    if (startUtc >= endUtc) {

      throw new BadRequestException(
        'End time must be greater than start time',
      );
    }
    const existingSession =
      await this.prisma.session.findFirst({
        where: {
          offeringId: createSessionDto.offeringId,
          startTimeUtc: {
            lt: endUtc,
          },
          endTimeUtc: {
            gt: startUtc,
          },
        },
      });

    if (existingSession) {
      throw new BadRequestException(
        'Session overlaps with an existing session',
      );
    }

    if (startUtc < new Date()) {
      throw new BadRequestException(
        'Session cannot be created in the past',
      );
    }

    return this.prisma.session.create({
      data: {
        offeringId: createSessionDto.offeringId,
        startTimeUtc: startUtc,
        endTimeUtc: endUtc,
      },
    });
  }

  async findAll() {

    return this.prisma.session.findMany({
      include: {
        offering: true,
      },
      orderBy: {
        startTimeUtc: 'asc',
      },
    });
  }
}

