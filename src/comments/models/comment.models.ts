import { Post } from "@nestjs/common";
import { BelongsTo, Column, Comment, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/models/user.models";

interface CommentCreateAttr{
    userId:number,
    postId:number,
    content:string
}

@Table({tableName:"comment", timestamps:false})

export class Comments extends Model<Comments, CommentCreateAttr>{
    @Column(
    {
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id: number

    @ForeignKey(() => Users)
    @Column({
        type:DataType.INTEGER
    })
    eventId:number

    @BelongsTo(() => Users)
    event:Event

    @ForeignKey(() => Posts)
    @Column({
        type:DataType.INTEGER
    })
    seatId:number

    @BelongsTo(() => Posts)
    seat:Posts

    @

    @HasOne(()=> Cart)
    card: Cart
}