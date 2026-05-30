import { Body, Controller, Get, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {

  constructor(
    private readonly sessionService: SessionService,
  ) {}

  @ApiCreatedResponse({
    description: 'Session created successfully',
  })
  @Post()
  create(
    @Body() createSessionDto: CreateSessionDto,
  ) {

    return this.sessionService.create(
      createSessionDto,
    );
  }

  @ApiOkResponse({
    description: 'Sessions fetched successfully',
  })
  @Get()
  findAll() {

    return this.sessionService.findAll();
  }
}