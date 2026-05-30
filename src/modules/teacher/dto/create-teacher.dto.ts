import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTeacherDto {

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Asia/Kolkata',
  })
  @IsString()
  timezone: string;
}