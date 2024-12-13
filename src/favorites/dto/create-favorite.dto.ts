import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

export class FavoritesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('uuid', { array: true, default: [] })
    artistIds: string[];
  
    @Column('uuid', { array: true, default: [] })
    albumIds: string[];
  
    @Column('uuid', { array: true, default: [] })
    trackIds: string[];
  
    @ManyToOne(() => UserEntity, user => user.favorites)
    user: UserEntity;
  
    @Column()
    userId: string;
  }
