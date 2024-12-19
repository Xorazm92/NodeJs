import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'; // MulterModule ni to'g'ri import qilish
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload', // Yuklanadigan fayllar uchun papka
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
