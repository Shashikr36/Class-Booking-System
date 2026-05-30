import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateSessionDto {

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  offeringId: number;

  @ApiProperty({
    example: '2026-06-07T18:00:00',
  })
  @IsDateString()
  startTime: string;

  @ApiProperty({
    example: '2026-06-07T19:00:00',
  })
  @IsDateString()
  endTime: string;
}