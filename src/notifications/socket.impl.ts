import { INotificationChannel } from "./ports.js";

export class SocketImpl implements INotificationChannel {
    async send(email: string, subject: string, message: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}