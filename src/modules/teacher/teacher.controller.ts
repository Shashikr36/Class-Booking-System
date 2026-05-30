import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import {
  ApiTags,
} from '@nestjs/swagger';

import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@ApiTags('Teachers')
@Controller('teachers')
export class TeacherController {

  constructor(
    private readonly teacherService: TeacherService,
  ) {}

  @Post()
  create(
    @Body() createTeacherDto: CreateTeacherDto,
  ) {

    return this.teacherService.create(
      createTeacherDto,
    );
  }

  @Get()
  findAll() {

    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {

    return this.teacherService.findOne(
      Number(id),
    );
  }


  @Get(':id/offerings')
findOfferings(
  @Param('id') id: string,
) {

  return this.teacherService.findOfferings(
    Number(id),
  );
}

@Get(':id/sessions')
findSessions(
  @Param('id') id: string,
) {

  return this.teacherService.findSessions(
    Number(id),
  );
}

@Get(':id/upcoming-sessions')
findUpcomingSessions(
  @Param('id') id: string,
) {

  return this.teacherService.findUpcomingSessions(
    Number(id),
  );
}
}