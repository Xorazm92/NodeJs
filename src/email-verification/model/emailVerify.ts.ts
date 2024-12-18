import { Column, DataType, ForeignKey, Model,  Table } from "sequelize-typescript";


interface EmailCreateAttr{
    user_id:string,
    token:string,

}
@Table({tableName:"email", timestamps:false})
export class Email extends Model<Email, EmailCreateAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id?:number

    @ForeignKey(() => Email)
    @Column({type:DataType.INTEGER})
    userId: number

    @Column ({
        type:DataType.STRING,
        allowNull:false
    })
    token:string

}