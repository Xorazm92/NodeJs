import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { User } from "src/users/model/user"

interface RolesCreateAttr{
    value:string,
    description:string,
}


@Table({tableName:"roles", timestamps:false})
export class Roles extends Model<Roles, RolesCreateAttr>{
    @Column(
    {
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id?: number
    
    @Column({
        type:DataType.STRING,
        unique: true,
        allowNull:true
    })
    value:string

    @Column({
        type:DataType.STRING
    })
    description: string

    @BelongsToMany(()=>User,()=> UserRoles)
    users:User[]

}
