import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateOfferingDto {

  @ApiProperty({
    example: 'Saturday Batch',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Asia/Kolkata',
  })
  @IsString()
  timezone: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  courseId: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  teacherId: number;
}