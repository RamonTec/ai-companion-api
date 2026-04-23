import { IAuthRepository } from "src/auth/domain/ports.js";
import { User } from "../../domain/entities/user.entity.js";
import { LoginDto } from "../dtos/login.dto.js";
import { CommonRepository } from "src/common/ports.js";
import { IUserRepository } from "@/users/domain/ports.js";

export class LoginUseCase {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly commonRepository: CommonRepository,
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(dto: LoginDto): Promise<{ access_token: string }> {
        const userExits = await this.userRepository.findByEmail(dto.email);
        if (!userExits) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.commonRepository.comparePassword(dto.password, userExits.getPassword);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return this.authRepository.login(userExits.getEmail, userExits.getNickName, userExits.getRole);
    }
}