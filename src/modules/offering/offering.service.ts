import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOfferingDto } from './dto/create-offering.dto';

@Injectable()
export class OfferingService {

  constructor(private prisma: PrismaService) {}

  async create(createOfferingDto: CreateOfferingDto) {

    const course =
      await this.prisma.course.findUnique({
        where: {
          id: createOfferingDto.courseId,
        },
      });

    if (!course) {
      throw new NotFoundException(
        'Course not found',
      );
    }

    const teacher =
      await this.prisma.teacher.findUnique({
        where: {
          id: createOfferingDto.teacherId,
        },
      });

    if (!teacher) {
      throw new NotFoundException(
        'Teacher not found',
      );
    }

    return this.prisma.offering.create({
      data: createOfferingDto,
      include: {
        course: true,
        teacher: true,
      },
    });
  }

  async findAll() {

    return this.prisma.offering.findMany({
      include: {
        course: true,
        teacher: true,
        sessions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}