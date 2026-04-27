import { INotificationChannel } from "@/notifications/ports.js";
import { ResetPasswordDto } from "../dtos/reset-password.dto.js";
import { IAuthUserProvider, ITokenProvider } from "../../domain/ports.js";

export class ResetPasswordUseCase {
    constructor(
        private readonly notificationService: INotificationChannel,
        private readonly userProvider: IAuthUserProvider,
        private readonly tokenProvider: ITokenProvider,
    ) { }

    async execute(dto: ResetPasswordDto): Promise<void> {
        const userExits = await this.userProvider.findByEmail(dto.email);
        if (!userExits) {
            throw new Error('Invalid information provided.');
        }
        const newToken = await this.tokenProvider.generate(userExits.getEmail(), userExits.getNickName(), userExits.getRole());

        await this.notificationService.send(userExits.getEmail(), 'Reset Password', `Your recovery code is ${newToken.access_token}`);
    }
}