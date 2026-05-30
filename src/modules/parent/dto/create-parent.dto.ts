import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateParentDto {

  @ApiProperty({
    example: 'Shashi Kumar',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'shashi@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Asia/Kolkata',
  })
  @IsString()
  timezone: string;
}