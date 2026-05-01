import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module.js';
import { CommonModule } from './common/common.module.js';
import { NotificationModule } from './notifications/notification.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_SEED,
        signOptions: { expiresIn: '1d' },
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL_MONGO || ''),
    PrismaModule,
    CommonModule,
    UserModule,
    AuthModule,
    NotificationModule
  ],
})
export class AppModule { }

