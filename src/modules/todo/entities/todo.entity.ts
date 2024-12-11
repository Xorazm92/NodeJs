import {Module} from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from 'src/modules/todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}