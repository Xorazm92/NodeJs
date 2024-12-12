import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AlbumsAt {
  name: string;
  grammy: boolean;
}

@Table({ tableName: "albums", timestamps: false }) // `timestamps` to'g'ri yozildi
export class Albums extends Model<Albums, AlbumsAt> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  grammy: boolean;
}
