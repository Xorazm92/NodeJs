import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/categry.entity';
import { Course } from 'src/course/entities/course.entity';
import { Group } from 'src/group/entities/group.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSourse = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'k7119zamu',
        database: 'lms',
        entities: [User, Category, Course, Group],
        synchronize: true,
      });
      return dataSourse.initialize();
    },
  },
];

console.log(__dirname);
