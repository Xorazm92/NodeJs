import { Controller, Get, Post, Body,Param, Delete, Put, UploadedFile } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);

  }

  @Post('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file;
  }



  @Post("signup")
  async signUp(@Body() createUserDto:CreateUserDto){
    return this.adminService.signUp(createUserDto)
  }


  @Post("signin")
  async signIn(@Body() signInDto:SignInDto){
    return this.adminService.signIn(signInDto)
  }

  @Get('all')
  findAll() {
    return this.adminService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
