import { User } from "./entities/user.entity.js";

export abstract class IAuthRepository {
    abstract login(email: string, password: string): Promise<User>;
    abstract register(email: string, password: string): Promise<User>;
    abstract resetPassword(email: string): Promise<User>;
    abstract updatePassword(email: string, password: string): Promise<string>;
    abstract recoveryPassword(email: string): Promise<string>;
}