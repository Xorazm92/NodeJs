import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[SequelizeModule.forFeature([Admin]), UsersModule,
  JwtModule.register(
    {
      global:true,
      secret:"MySecretKey",
      signOptions:{
        expiresIn:"1h"
      }
    }
  ),
  MulterModule.register({
    dest: './uploads',
  }),],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
