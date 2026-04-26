export abstract class CommonRepository {
    abstract hashPassword(password: string): Promise<string>;
    abstract comparePassword(password: string, hash: string): Promise<boolean>;
    abstract generateToken(email: string, name: string, role: string): Promise<{ access_token: string }>;
    abstract validateToken(token: string): Promise<boolean>;
}