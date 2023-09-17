import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    // authService.doSomething();
  }
  @Post('register')
  // register(@Req() request: Request) {
  //   // return 'register a new user';
  //   // return {
  //   //   x: 1,
  //   //   y: 2,
  //   //   name: 'tuan',
  //   // };
  //   console.log(request.body);
  //   return this.authService.register();
  // }
  register(@Body() authDTO: AuthDTO) {
    return this.authService.register(authDTO);
  }
  // register(@Body('email') email: string, @Body('password') password: string) {
  //   console.log(email);
  //   console.log(password);
  //   console.log('typeof email');
  //   console.log(typeof email);
  //   return this.authService.register();
  // }
  @Post('login')
  login(@Body() authDTO: AuthDTO) {
    // return 'login  to your account';
    return this.authService.login(authDTO);
  }
}
