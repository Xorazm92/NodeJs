import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { User } from 'src/user/models/user.model';

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

  async generateToken(user:User){
    const payload = {
      sub:user.id,
      email:user.email,
      roles:user.roles
    }
    return {token: this.jwtService.sign(payload)}
  }
}
