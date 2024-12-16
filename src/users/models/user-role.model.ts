import { timestamp } from "rxjs";
import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { Users } from "./user.models";
import { Role } from "src/role/models/role.model";

interface IUserRoleCreateAttr{
    userId:number,
    roleId:number
}

@Table({tableName:"user_roles", timestamps:false})
export class UserRoles extends Model<UserRoles, IUserRoleCreateAttr>{
    @ForeignKey(() => Users )
    @Column({type:DataType.INTEGER})
        userId:number

    @ForeignKey(() => Role)
    @Column({type:DataType.INTEGER})
        roleId:number

}