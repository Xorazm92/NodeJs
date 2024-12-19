

import { Body, Controller, Param, Post, Put, UploadedFile, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('profile')
  @UseGuards(JwtAuthGuard) // Protect the route with JWT guard
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Param('userId') userId: number,
  ) {
    return this.usersService.updateProfile(userId, updateProfileDto);
  }


  @Post('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
  return file
}


}
