import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { courseProvider } from './course.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [...courseProvider, CourseService],
})
export class CourseModule {}
