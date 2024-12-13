import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { Users } from './users/models/user.models'; // Modelni to'g'ri import qilish
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config'; // ConfigModule ni import qiling

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
  
      autoLoadModels: true,
      synchronize: true, 
      logging: false,
      models: [Users], 
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

