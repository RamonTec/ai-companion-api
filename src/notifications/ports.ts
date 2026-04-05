export abstract class INotificationChannel {
    abstract send(email: string, subject: string, message: string): Promise<void>;
}