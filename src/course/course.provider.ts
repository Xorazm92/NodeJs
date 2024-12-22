import { DataSource } from 'typeorm';
import { Course } from './entities/course.entity';

export const courseProvider = [
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
];
