import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {

  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {

    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll() {

    return this.prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}