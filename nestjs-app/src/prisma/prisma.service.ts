import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'postgresql://postgres:Abc123456789@localhost:5434/testdb?schema=public',
          url: configService.get('DATABASE_URL'),
        },
      },
    });
    console.log('configService');
    console.log(JSON.stringify(configService));
    console.log(JSON.stringify(configService.get('DATABASE_URL')));
  }
}
