import { User } from "./entities/user.entity.js";
import { UserRegisterDto } from "../application/dtos/user-register.dto.js";

export abstract class IUserRepository {
    abstract register(userRegisterDto: UserRegisterDto): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByNickName(nickName: string): Promise<User | null>;
    abstract findUserById(id: string): Promise<User | null>;
    abstract findUserByNickNameOrEmail(nickName: string, email: string): Promise<User | null>;
}