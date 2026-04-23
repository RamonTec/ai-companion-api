
export abstract class IAuthRepository {
    abstract login(email: string, name: string, role: string): Promise<{ access_token: string }>;
}