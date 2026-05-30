import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('parent')
@Controller('parents')
export class ParentController {

  constructor(
    private readonly parentService: ParentService,
  ) {}

  @ApiCreatedResponse({
    description: 'Parent created successfully',
  })
  @Post()
  create(
    @Body() createParentDto: CreateParentDto,
  ) {

    return this.parentService.create(
      createParentDto,
    );
  }

  @ApiOkResponse({
    description: 'Parents fetched successfully',
  })
  @Get()
  findAll() {

    return this.parentService.findAll();
  }
}