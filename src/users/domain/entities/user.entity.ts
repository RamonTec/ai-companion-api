import { UserRole } from "../user.js";

export class User {
    private constructor(
        private readonly id: string,
        private readonly email: string,
        private readonly password: string,
        private readonly createdAt: Date,
        private readonly updatedAt: Date,
        private readonly firstName: string,
        private readonly lastName: string,
        private readonly isVerified: boolean,
        private readonly nickName: string,
        private readonly role: UserRole,
        private readonly phone?: string,
        private readonly paymentMethod?: string[],
        private readonly subscription?: string,
        private readonly subscriptionId?: string,
    ) { }

    static fromPersistence(prismaUser: any): User {
        return new User(
            prismaUser.id,
            prismaUser.email,
            prismaUser.password,
            prismaUser.createdAt,
            prismaUser.updatedAt,
            prismaUser.firstName,
            prismaUser.lastName,
            prismaUser.isVerified,
            prismaUser.nickName,
            prismaUser.role,
            prismaUser.phone || undefined,
            prismaUser.paymentMethod,
            prismaUser.subscriptionId || undefined
        );
    }

    get getId(): string { return this.id; }
    get getEmail(): string { return this.email; }
    get getFirstName(): string { return this.firstName; }
    get getLastName(): string { return this.lastName; }
    get getNickName(): string { return this.nickName; }
    get getPassword(): string { return this.password; }
    get getIsVerified(): boolean { return this.isVerified; }
    get getRole(): UserRole { return this.role; }
}
