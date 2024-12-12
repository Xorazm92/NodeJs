import { 
  Column, 
  DataType, 
  Table, Model 
} from 'sequelize-typescript';

interface UserCreate {
  login: string;
  password: string;
  version: number; // integer number, increments on update
}

@Table({ tableName: "users", timestamps: false })
export class Users extends Model<Users, UserCreate> {
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
