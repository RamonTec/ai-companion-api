import { User } from "./entities/user.entity.js";

export abstract class IUserRepository {
    abstract register(user: User): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByNickName(nickName: string): Promise<User | null>;
    abstract findUserById(id: string): Promise<User | null>;
    abstract findUsersByIds(ids: string[]): Promise<User[]>;
    abstract findUserByNickNameOrEmail(nickName: string, email: string): Promise<User | null>;
    abstract updateUserPassword(id: string, password: string): Promise<User>;
}