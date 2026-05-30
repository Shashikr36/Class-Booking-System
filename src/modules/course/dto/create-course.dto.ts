import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {

  @ApiProperty({
    example: 'Python Coding',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Beginner friendly python course',
  })
  @IsOptional()
  @IsString()
  description?: string;
}