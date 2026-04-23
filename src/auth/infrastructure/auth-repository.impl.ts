import { IAuthRepository } from "../domain/ports.js";
import { PrismaClient } from "prisma/generated/client.js";
import { JwtService } from '@nestjs/jwt';

export class AuthRepositoryImpl implements IAuthRepository {
    constructor(
        private readonly prisma: PrismaClient,
        private jwtService: JwtService,
    ) { }


    async login(email: string, name: string, role: string): Promise<{ access_token: string }> {
        const payload = { sub: email, username: name, role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}