import { 
    Column, 
    DataType, 
    Table, Model, 
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Users } from 'src/users/models/user.model';
  
  interface ArtistCreate {
    userId: number;
    name: string;
    grammy: boolean;
  }
  
  @Table({ tableName: "artists", timestamps: false })
  export class Artists extends Model<Artists, ArtistCreate> {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true, 
      primaryKey: true,
    })
    id?: number;
  
    @ForeignKey(() => Artists)
    @Column({
        type:DataType.INTEGER
    })
    userId:number

    @BelongsTo(() => Users)
    artist:Artists


    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    name?: string;
  
    @Column(
        {
            type:DataType.BOOLEAN,
            defaultValue: false
        })
        grammy:boolean
  }
  
