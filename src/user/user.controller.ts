import { Body, Controller, Get, Post, Response, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { passwordDto } from './dto/password.dto';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Auth()
  @Get('profile')
  getProfile(@User('id') id: string) {
    return this.userService.profile(id)
  }

  @Auth()
  @Get('applications')
  getApplications(@User('id') id: string) {
    return this.userService.applications(id)
  }

  @Auth()
  @Post('change-password')
  @UsePipes(new ValidationPipe())
  changePassword(@User('id') id: string, @Body() data: passwordDto) {
    return this.userService.changePassword(id, data)
  }
}
