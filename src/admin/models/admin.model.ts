import { Column, DataType, Model, Table } from "sequelize-typescript"

interface AdminCreationAttr{
    name:string,
    login:string,
    hashed_password:string,
    is_active:boolean,
    is_creator:boolean,
    hashed_refresh_token: string
}

@Table({tableName:"admin", timestamps:false})
export class Admin extends Model<Admin, AdminCreationAttr>{

    @Column(
    {
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id?: number


    @Column(
    {
        type:DataType.STRING,
        allowNull:true
    })
    name:string

    @Column(
    {
        type:DataType.STRING,
        allowNull:true
    })
    login:string


    @Column(
    {
        type:DataType.STRING,
        allowNull:true
    })
    hashed_password:string

    @Column(
    {
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    is_active:boolean


    @Column(
    {
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    is_creator:boolean

    @Column(
    {
        type:DataType.STRING
    })
    hashed_refresh_token: string

}