import { IAuthRepository } from "src/auth/domain/ports.js";
import { IUserRepository } from "@/users/domain/ports.js";
import { INotificationChannel } from "@/notifications/ports.js";
import { ResetPasswordDto } from "../dtos/reset-password.dto.js";

export class ResetPasswordUseCase {
    constructor(
        private readonly notificationService: INotificationChannel,
        private readonly userRepository: IUserRepository,
        private readonly authRepository: IAuthRepository,
    ) { }

    async execute(dto: ResetPasswordDto): Promise<void> {
        const userExits = await this.userRepository.findByEmail(dto.email);
        if (!userExits) {
            throw new Error('User not found');
        }
        const newToken = await this.authRepository.login(userExits.getEmail, userExits.getNickName, userExits.getRole);

        await this.notificationService.send(userExits.getEmail, 'Reset Password', `Your recovery code is ${newToken.access_token}`);
    }
}