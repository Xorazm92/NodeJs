import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './role/roles.module'; 
import { PasswordResetModule } from './password-reset/password-reset.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';


import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    PasswordResetModule,
    EmailVerificationModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
