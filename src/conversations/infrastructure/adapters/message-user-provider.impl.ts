import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/users/domain/ports.js';
import { IMessageUserProvider } from '@/conversations/domain/port.js';

@Injectable()
export class MessageUserProviderImpl implements IMessageUserProvider {
    constructor(private readonly userRepository: IUserRepository) { }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findUserById(id);
    }

    async findUsersByIds(ids: string[]): Promise<User[]> {
        return await this.userRepository.findUsersByIds(ids);
    }
}
