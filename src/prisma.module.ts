import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '../prisma/generated/client.js';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({
    providers: [
        PrismaService,
        {
            provide: PrismaClient,
            useExisting: PrismaService,
        },
    ],
    exports: [PrismaService, PrismaClient],
})
export class PrismaModule { }
