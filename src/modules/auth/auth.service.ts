import { Injectable } from '@nestjs/common';

import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { RegisterParentDto } from './dto/register-parent.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  async registerTeacher(
    dto: RegisterTeacherDto,
  ) {

    return {
      message: 'Teacher registered successfully',
    };
  }

  async registerParent(
    dto: RegisterParentDto,
  ) {

    return {
      message: 'Parent registered successfully',
    };
  }

  async login(
    dto: LoginDto,
  ) {

    return {
      message: 'Login successful',
    };
  }
}

