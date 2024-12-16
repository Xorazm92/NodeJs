import { Address } from 'cluster';
import {
    Column,
    DataType,
    HasMany,
    HasOne,
    Model,
    Table,
  } from 'sequelize-typescript';

  interface UserCreationAttr {
    fullname: string;
    email: string;
    password: string;
    isActive: boolean;
  }
  
  @Table({ tableName: 'users' })
  export class User extends Model<User, UserCreationAttr> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @Column({ type: DataType.STRING })
    fullname: string;
  
    @Column({ type: DataType.STRING })
    email: string;
  
    @Column({ type: DataType.STRING })
    password: string;
  
    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    isActive: boolean;
  
  }
  
