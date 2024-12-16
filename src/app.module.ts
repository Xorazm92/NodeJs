import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { Users } from './users/models/user.models'; // Modelni to'g'ri import qilish
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config'; // ConfigModule ni import qiling
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

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
    CommentsModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

