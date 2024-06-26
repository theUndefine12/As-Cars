import { Body, Controller, Get, Post, Response, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/guards/auth.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { passwordDto } from './dto/password.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseInterceptors(CacheInterceptor)
  @CacheTTL(200000)
  @Get()
  @Auth()
  getcars(@User('id') id: string) {
    return this.userService.users(id)
  }

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
