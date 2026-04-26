import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IPasswordHasher } from '../../domain/ports.js';

@Injectable()
export class PasswordHasherImpl implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS));
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
