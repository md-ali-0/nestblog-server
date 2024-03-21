import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpUser: Record<string, any>) {
    return this.authService.signUP(signUpUser);
  }

  @UseGuards(AuthGuard)
  @Post('token-verify')
  getProfile(@Req() req: Record<string, any>) {
    return this.authService.tokenVerify(req.user);
  }
}
