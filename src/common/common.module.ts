import { Global, Module } from '@nestjs/common';
import { CommonRepository } from './ports.js';
import { CommonRepositoryImpl } from './common.repository.js';

@Global()
@Module({
    providers: [
        {
            provide: CommonRepository,
            useClass: CommonRepositoryImpl,
        },
    ],
    exports: [CommonRepository],
})
export class CommonModule { }
