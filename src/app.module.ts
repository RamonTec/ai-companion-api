import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module.js';
import { CommonModule } from './common/common.module.js';
import { NotificationModule } from './notifications/notification.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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

