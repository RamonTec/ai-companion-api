import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenProvider } from '../../domain/ports.js';

@Injectable()
export class TokenProviderImpl implements ITokenProvider {
    constructor(private readonly jwtService: JwtService) {}

    async generate(email: string, name: string, role: string): Promise<{ access_token: string }> {
        const payload = { sub: email, username: name, role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validate(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token);
            return true;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
