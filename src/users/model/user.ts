import cluster from "cluster";
import { truncate } from "fs";
import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

interface UserCreateAttr{
    name:string,
    email:string,
    password:string,
    role_value:string
}
@Table({tableName:"user", timestamps:false})
export class User extends Model<User, UserCreateAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id?:number

    @Column ({
        type: DataType.STRING,
        unique:true,
        allowNull:true
    })
    email:string

    @Column ({
        type:DataType.STRING,
        allowNull:false
    })
    password:string

    @Column({
        type:DataType.STRING,

    })
    firstName:string

    @Column({
        type:DataType.STRING,
    })
    lastName:string

    @Column({
        type:DataType.STRING,
    })
    avatarUrl:string

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false,
    })
    isEmailVerified:string
}