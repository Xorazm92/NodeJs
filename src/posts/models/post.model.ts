import { timestamp } from "rxjs";
import { AutoIncrement, Column, Comment, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Comments } from "src/comments/models/comment.models";
import { Users } from "src/users/models/user.models";
import internal from "stream";

interface PostCreateAttr{
    userId:number,
    title: string,
    content:string,
    slug:string
}
@Table({tableName:"post", timestamps: false})
export class Post extends Model<Post, PostCreateAttr>{
 
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  slug: string;

  @ForeignKey(() => Comments)
  @Column({
    type: DataType.INTEGER
  })
  commentId: number;

  @HasMany(() => Comments)
  comments: Comments[];

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER
  })
  users_id: number;

  @HasMany(() => Users)
  users: Users[];
}