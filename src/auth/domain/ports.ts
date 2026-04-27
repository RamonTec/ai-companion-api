
export interface AuthUser {
    getId(): string;
    getEmail(): string;
    getPassword(): string;
    getNickName(): string;
    getRole(): string;
}

export abstract class ITokenProvider {
    abstract generate(email: string, name: string, role: string): Promise<{ access_token: string }>;
    abstract validate(token: string): Promise<boolean>;
}

export abstract class IPasswordHasher {
    abstract hash(password: string): Promise<string>;
    abstract compare(password: string, hash: string): Promise<boolean>;
}

export abstract class IAuthUserProvider {
    abstract findByEmail(email: string): Promise<AuthUser | null>;
    abstract updatePassword(userId: string, newHash: string): Promise<void>;
}