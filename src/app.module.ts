import { Module } from '@nestjs/common';

import { CourseModule } from './modules/course/course.module';
import { OfferingModule } from './modules/offering/offering.module';
import { SessionModule } from './modules/session/session.module';
import { ParentModule } from './modules/parent/parent.module';
import { BookingModule } from './modules/booking/booking.module';
import { AuthModule } from './modules/auth/auth.module';
import { TeacherModule } from './modules/teacher/teacher.module';

@Module({
  imports: [
    CourseModule,
    OfferingModule,
    SessionModule,
    ParentModule,
    BookingModule,
    AuthModule,
    TeacherModule,
  ],
})
export class AppModule {}
