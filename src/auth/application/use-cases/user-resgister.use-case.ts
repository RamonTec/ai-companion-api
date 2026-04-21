import { IAuthRepository } from "src/auth/domain/ports.js";
import { User } from "../../domain/entities/user.entity.js";
import { UserRegisterDto } from "../dtos/user-register.dto.js";
import { CommonRepository } from "src/common/ports.js";
import { IUserRepository } from "@/users/domain/ports.js";

export class UserRegisterUseCase {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly commonRepository: CommonRepository,
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(dto: UserRegisterDto): Promise<User> {
        const userExits = await this.userRepository.findByEmail(dto.email);
        if (userExits) {
            throw new Error('User already exists');
        }

        if (dto.password !== dto.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const passwordHash = await this.commonRepository.hashPassword(dto.password);

        return this.authRepository.register(dto.email, passwordHash);
    }
}