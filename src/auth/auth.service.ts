import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, SignInDto } from './dto/signin.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}
  async signUp(createUserDto:CreateUserDto){
    const candidate = await this.userService.findUserByEmail(createUserDto.email);
    
    if(candidate)
      throw new BadRequestException("User alarady exsist...")

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7)

    const newUser = await this.userService.create(
      {
        ...createUserDto, password:
        hashedPassword
      }
    )
  };

  async signIn(signInDto:SignInDto){
    const user = await this.userService.findUserByEmail(signInDto.email);

    if(!user)
      throw new UnauthorizedException("User alarady exsist...")

    const validPassword = await bcrypt.compare(signInDto.password, user.password)

    if(!validPassword)
      throw new UnauthorizedException("User alarady exsist...")

    return this.generateToken(user)
  }

  async generateToken(user:Users){
    const payload = {
      sub:user.id,
      email:user.email,
      roles:user.roles
    }
    return {token: this.jwtService.sign(payload)}
  }
}
