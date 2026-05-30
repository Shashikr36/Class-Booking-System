import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}
    async create(createTeacherDto: CreateTeacherDto) {

    const existingTeacher =
        await this.prisma.teacher.findUnique({
        where: {
            email: createTeacherDto.email,
        },
        });

    if (existingTeacher) {
        throw new BadRequestException(
        'Teacher with this email already exists',
        );
    }

    return this.prisma.teacher.create({
        data: createTeacherDto,
    });
}

  async findAll() {

    return this.prisma.teacher.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {

    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }



  async findOfferings(id: number) {

    const teacher =
        await this.prisma.teacher.findUnique({
        where: { id },
        });

    if (!teacher) {
        throw new NotFoundException(
        'Teacher not found',
        );
    }

    return this.prisma.offering.findMany({
        where: {
        teacherId: id,
        },
        include: {
        course: true,
        },
    });
    }

    async findSessions(id: number) {

    const teacher =
        await this.prisma.teacher.findUnique({
        where: { id },
        });

    if (!teacher) {
        throw new NotFoundException(
        'Teacher not found',
        );
    }

    return this.prisma.session.findMany({
        where: {
        offering: {
            teacherId: id,
        },
        },
        include: {
        offering: true,
        },
        orderBy: {
        startTimeUtc: 'asc',
        },
    });
    }
    async findUpcomingSessions(
    id: number,
    ) {

    const teacher =
        await this.prisma.teacher.findUnique({
        where: { id },
        });

    if (!teacher) {
        throw new NotFoundException(
        'Teacher not found',
        );
    }

    return this.prisma.session.findMany({
        where: {
        offering: {
            teacherId: id,
        },
        startTimeUtc: {
            gte: new Date(),
        },
        },
        include: {
        offering: true,
        },
        orderBy: {
        startTimeUtc: 'asc',
        },
    });
    }
}