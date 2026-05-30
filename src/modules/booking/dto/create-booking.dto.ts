import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateBookingDto {

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  parentId: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  offeringId: number;
}