import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { RegisterParentDto } from './dto/register-parent.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register/teacher')
  registerTeacher(
    @Body() dto: RegisterTeacherDto,
  ) {

    return this.authService.registerTeacher(
      dto,
    );
  }

  @Post('register/parent')
  registerParent(
    @Body() dto: RegisterParentDto,
  ) {

    return this.authService.registerParent(
      dto,
    );
  }

  @Post('login')
  login(
    @Body() dto: LoginDto,
  ) {

    return this.authService.login(
      dto,
    );
  }
}

