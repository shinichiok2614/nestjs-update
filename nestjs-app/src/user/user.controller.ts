import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../decorator';
import { MyJWTGuard } from '../guard';
@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(MyJWTGuard)
  @Get('me')
  // me(@Req() request: Request) {
  me(@GetUser() user: User) {
    // console.log(JSON.stringify(Object.keys(request)));
    // console.log(request.user);
    // return 'My Detail infomation';
    // return request.user;
    return user;
  }
}
