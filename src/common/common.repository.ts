import * as bcrypt from 'bcrypt';
import { CommonRepository } from './ports.js';

export class CommonRepositoryImpl implements CommonRepository {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS));
    }
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}