import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';


@ApiTags('booking')
@Controller('bookings')
export class BookingController {

  constructor(
    private readonly bookingService: BookingService,
  ) {}
  @ApiCreatedResponse({
    description: 'Booking created successfully',
  })
  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
  ) {

    return this.bookingService.create(
      createBookingDto,
    );
  }

  @ApiOkResponse({
    description: 'Bookings fetched successfully',
  })
  @Get()
  findAll() {

    return this.bookingService.findAll();
  }

  @Get('/parent/:parentId')
  findParentBookings(
    @Param('parentId') parentId: string,
  ) {

    return this.bookingService.findParentBookings(
      Number(parentId),
    );
  }
}

