import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller.js';
import { UserRegisterUseCase } from './application/use-cases/user-resgister.use-case.js';
import { IUserRepository } from './domain/ports.js';
import { PrismaUserImpl } from './infrastructure/db/prisma-user.impl.js';
import { PrismaClient } from '../../prisma/generated/client.js';
import { CommonRepository } from '../common/ports.js';
import { INotificationChannel } from '../notifications/ports.js';

@Module({
    controllers: [UserController],
    providers: [
        {
            provide: IUserRepository,
            useFactory: (prisma: PrismaClient) => new PrismaUserImpl(prisma),
            inject: [PrismaClient],
        },
        {
            provide: UserRegisterUseCase,
            useFactory: (userRepository: IUserRepository, commonRepository: CommonRepository, notificationService: INotificationChannel) => new UserRegisterUseCase(userRepository, commonRepository, notificationService),
            inject: [IUserRepository, CommonRepository, INotificationChannel],
        },
    ],
    exports: [UserRegisterUseCase],
})
export class UserModule { }
