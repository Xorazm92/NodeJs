
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface UsersCreateAttr{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    
}
@Table({tableName:"users", timestamps:false})
export class Users extends Model < Users, UsersCreateAttr>{
    @Column(
     {
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id?: number

    @Column({
        type:DataType.STRING,
        allowNull: true
    })
    firstname:string

    @Column({
        type:DataType.STRING,
        allowNull: true
    })
    lastname:string

    @Column({
        type:DataType.STRING,
        unique:true,
        allowNull: true
    })
    email: string

    @Column({
        type:DataType.STRING,
    })
    password:string

}
