import { Model } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface UserCreat {
  login: string;
  password: string;
  version: number; // integer number, increments on update
}

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: "users", timestamps: false })
export class Users extends Model<Users, UserCreat> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true, // Kichik harfda
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true, // Kichik harfda
  })
  login?: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
  })
  version: number;
}

