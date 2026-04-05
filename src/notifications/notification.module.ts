import { Global, Module } from '@nestjs/common';
import { INotificationChannel } from './ports.js';
import { EmailImpl } from './email.impl.js';

@Global()
@Module({
    providers: [
        {
            provide: INotificationChannel,
            useClass: EmailImpl,
        },
    ],
    exports: [INotificationChannel],
})
export class NotificationModule { }
