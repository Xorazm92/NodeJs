import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/user.providers';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      secret: 'supersecret',
    }),
  ],
  controllers: [AuthController],
  providers: [...userProviders, AuthService],
})
export class AuthModule {}
