export abstract class IAuthRepository {
    abstract login(email: string, password: string): Promise<string>;
    abstract register(email: string, password: string): Promise<string>;
    abstract resetPassword(email: string): Promise<string>;
    abstract updatePassword(email: string, password: string): Promise<string>;
    abstract recoveryPassword(email: string): Promise<string>;
}