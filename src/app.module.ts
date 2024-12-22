import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';
import { GroupModule } from './group/group.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UsersModule,
    CategoryModule,
    CourseModule,
    GroupModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
