import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { adminDto } from './dto/auth.dto';
import { tokenDto } from './dto/toke.dto';
import { passwordDto } from 'src/user/dto/password.dto';
import { Auth } from 'src/auth/guards/auth.decorator';
import { User } from 'src/auth/decorators/user.decorator';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() data: adminDto) {
    return this.adminService.signup(data)
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  signin(@Body() data: adminDto) {
    return this.adminService.signin(data)
  }

  @Post('refresh-token')
  @UsePipes(new ValidationPipe())
  refresh(@Body() data: tokenDto) {
    return this.adminService.refresh(data)
  }

  @Auth()
  @Get('aa')
  getPr(@User('id') id: string) {
    return this.adminService.getprofile(id)
  }

  @Post('change-password')
  @UsePipes(new ValidationPipe())
  chnagePassword(@User('id') id: string, @Body() data: passwordDto) {
    return this.adminService.changePass(id, data)
  }
}
