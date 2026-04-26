
import { IUserRepository } from "@/users/domain/ports.js";
import { CommonRepository } from "@/common/ports.js";
import { ResetPasswordDto } from "../dtos/reset-password.dto.js";

export class RecoveryPasswordUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly commonRepository: CommonRepository,
    ) { }

    async execute(dto: ResetPasswordDto): Promise<boolean> {
        const validateToken = await this.commonRepository.validateToken(dto.token);
        if (!validateToken) {
            throw new Error('Token is not valid');
        }
        const userExits = await this.userRepository.findByEmail(dto.email);
        if (!userExits) {
            throw new Error('User not found');
        }

        if (dto.confirmPassword !== dto.newPassword) {
            throw new Error('Passwords do not match');
        }

        const hashPassword = await this.commonRepository.hashPassword(dto.newPassword);
        await this.userRepository.updateUserPassword(userExits.getId, hashPassword);
        return true;
    }
}