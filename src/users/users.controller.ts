

import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";

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
}
