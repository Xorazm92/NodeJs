import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRoles, {
    message: 'Role must be one of the following: student, teacher, or manager',
  })
  role: UserRoles;
}
