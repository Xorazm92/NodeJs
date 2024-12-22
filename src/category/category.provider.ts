import { DataSource } from 'typeorm';
import { Category } from './entities/categry.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSourse: DataSource) => dataSourse.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
