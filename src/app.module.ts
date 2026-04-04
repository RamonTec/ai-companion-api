import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module.js';
import { PrismaModule } from './prisma.module.js';
import { CommonModule } from './common/common.module.js';
import { NotificationModule } from './notifications/notification.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CommonModule,
    UserModule,
    NotificationModule
  ],
})
export class AppModule { }

