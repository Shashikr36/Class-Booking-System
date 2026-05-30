import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {

  constructor(
    private readonly courseService: CourseService,
  ) {}

  @ApiCreatedResponse({
    description: 'Course created successfully',
  })
  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto,
  ) {

    return this.courseService.create(
      createCourseDto,
    );
  }

  @ApiOkResponse({
    description: 'Courses fetched successfully',
  })
  @Get()
  findAll() {

    return this.courseService.findAll();
  }
}

