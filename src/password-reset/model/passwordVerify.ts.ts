import cluster from "cluster";
import { truncate } from "fs";
import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

interface PasswordResetCreateAttr{
    user_id:string,
    token:string,

}
@Table({tableName:"password", timestamps:false})
export class Password extends Model<Password, PasswordResetCreateAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id?:number

    @ForeignKey(() => Password)
    @Column({type:DataType.INTEGER})
    userId: number

    @Column ({
        type:DataType.STRING,
        allowNull:false
    })
    token:string

}