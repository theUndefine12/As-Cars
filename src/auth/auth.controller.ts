import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { otpDto } from './dto/otp.dto';
import { tokenDto } from './dto/toke.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAll() {
    return this.authService.getAll()
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  rigester(@Body() data: AuthDto) {
    return this.authService.signUp(data)
  }

  @Post('verify')
  @UsePipes(new ValidationPipe())
  otp(@Body() data: otpDto) {
    return this.authService.otp(data)
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  login(@Body() data: AuthDto) {
    return this.authService.signIn(data)
  }

  @Post('refresh-token')
  @UsePipes(new ValidationPipe())
  refressh(@Body() data: tokenDto) {
    return this.authService.refresh(data)
  }
}
