import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [],
  providers: [],
})
export class TodoModule {}
