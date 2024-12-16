import { BelongsToMany, Column, DataType, Table } from "sequelize-typescript";
import { UserRoles } from "src/users/models/user-role.model";
import { Users } from "src/users/models/user.models";

interface RolesCreateAttr{
    value:string,
    description:string,
}

@Table({tableName:"roles", timestamps:false})
export class Roles extends Model<Roles,RolesCreateAttr>{
  static findAll() {
    throw new Error('Method not implemented.');
  }
  static findOne(arg0: { where: { value: string; }; }) {
    throw new Error('Method not implemented.');
  }
  static findByPk(id: number) {
    throw new Error('Method not implemented.');
  }
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
    
        @BelongsToMany(()=>Users,()=> UserRoles)
        users:Users[]
}
