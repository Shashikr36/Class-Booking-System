import { Body, Controller, Get, Post } from '@nestjs/common';
import { OfferingService } from './offering.service';
import { CreateOfferingDto } from './dto/create-offering.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Offerings')
@Controller('offerings')
export class OfferingController {

  constructor(
    private readonly offeringService: OfferingService,
  ) {}

  @ApiCreatedResponse({
    description: 'Offering created successfully',
  })
  @Post()
  create(
    @Body() createOfferingDto: CreateOfferingDto,
  ) {

    return this.offeringService.create(
      createOfferingDto,
    );
  }

  @ApiOkResponse({
    description: 'Offerings fetched successfully',
  })
  @Get()
  findAll() {

    return this.offeringService.findAll();
  }
}