import { Injectable } from '@nestjs/common';
import { IAuthUserProvider, AuthUser } from '../../domain/ports.js';
import { IUserRepository } from '@/users/domain/ports.js';

@Injectable()
export class AuthUserProviderImpl implements IAuthUserProvider {
    constructor(private readonly userRepository: IUserRepository) {}

    async findByEmail(email: string): Promise<AuthUser | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return null;
        return user;
    }

    async updatePassword(userId: string, newHash: string): Promise<void> {
        await this.userRepository.updateUserPassword(userId, newHash);
    }
}
