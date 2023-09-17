import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDTO: AuthDTO) {
    const hashedPassword = await argon.hash(authDTO.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword: hashedPassword,
          firstName: '',
          lastName: '',
        },
        select: {
          //những phần sẽ được trả về trong return user
          id: true,
          email: true,
          createdAt: true,
        },
      });
      // return user;
      return await this.signJwtToken(user.id, user.email);
    } catch (error) {
      if (error.code == 'P2002') {
        // throw new ForbiddenException(error.message);
        throw new ForbiddenException('Error in credentials');
      }
      // return {
      //   error,
      // };
    }
    // return {
    //   message: `authservice.register.hashedPassword ${hashedPassword}`,
    // };
  }
  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );
    if (!passwordMatched) throw new ForbiddenException('Incorrect password');
    // return {
    //   message: 'authservice.login',
    // };
    delete user.hashedPassword;
    // return user;
    return await this.signJwtToken(user.id, user.email);
  }
  // convertToJwtString(userId: number, email: string): Promise<string> {
  //   const payload = {
  //     sub: userId,
  //     email,
  //   };
  //   return this.jwtService.signAsync(payload, {
  //     expiresIn: '10m',
  //     secret: this.configService.get('JWT_SECRET'),
  //   });
  // }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
