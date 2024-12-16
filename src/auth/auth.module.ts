import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  import: [
    UsersModule,
    JwtModule.register(
      {
        global:true,
        secret: "MySecretKey",
        signOptions:{
          expiresIn:"1h"
        }
      }
    )
  ]
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}
