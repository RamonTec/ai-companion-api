import * as bcrypt from 'bcrypt';
import { CommonRepository } from './ports.js';
import { JwtService } from '@nestjs/jwt';

export class CommonRepositoryImpl implements CommonRepository {
    constructor(
        private readonly jwtService: JwtService,
    ) { }
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS));
    }
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async generateToken(email: string, name: string, role: string): Promise<{ access_token: string }> {
        const payload = { sub: email, username: name, role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validateToken(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token);
            return true;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}