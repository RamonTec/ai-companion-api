import { PrismaClient } from "../../../../prisma/generated/client.js";
import { User } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/ports.js";

export class PrismaUserImpl implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async register(user: User): Promise<User> {
        const prismaUser = await this.prisma.user.create({
            data: {
                email: user.getEmail,
                password: user.getPassword,
                firstName: user.getFirstName,
                lastName: user.getLastName,
                nickName: user.getNickName,
                isVerified: user.getIsVerified,
                role: user.getRole,
            },
        });

        return User.fromPersistence(prismaUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        const prismaUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        return prismaUser ? User.fromPersistence(prismaUser) : null;
    }

    async findByNickName(nickName: string): Promise<User | null> {
        const prismaUser = await this.prisma.user.findUnique({
            where: {
                nickName,
            },
        });

        return prismaUser ? User.fromPersistence(prismaUser) : null;
    }

    async findUserById(id: string): Promise<User | null> {
        const prismaUser = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        return prismaUser ? User.fromPersistence(prismaUser) : null;
    }

    async findUserByNickNameOrEmail(nickName: string, email: string): Promise<User | null> {
        const prismaUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { nickName },
                    { email },
                ],
            },
        });

        return prismaUser ? User.fromPersistence(prismaUser) : null;
    }

    async updateUserPassword(id: string, password: string): Promise<User> {
        const prismaUser = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });

        return User.fromPersistence(prismaUser);
    }

    async findUsersByIds(ids: string[]): Promise<User[]> {
        const prismaUsers = await this.prisma.user.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return prismaUsers.map((prismaUser) => User.fromPersistence(prismaUser));
    }
}