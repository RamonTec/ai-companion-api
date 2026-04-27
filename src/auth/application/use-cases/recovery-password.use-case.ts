import { RecoveryPasswordDto } from "../dtos/recovery-password.dto.js";
import { IAuthUserProvider, IPasswordHasher, ITokenProvider } from "../../domain/ports.js";

export class RecoveryPasswordUseCase {
    constructor(
        private readonly userProvider: IAuthUserProvider,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenProvider: ITokenProvider,
    ) { }

    async execute(dto: RecoveryPasswordDto): Promise<boolean> {
        const validateToken = await this.tokenProvider.validate(dto.token);
        if (!validateToken) {
            throw new Error('Invalid information provided.');
        }
        const userExits = await this.userProvider.findByEmail(dto.email);
        if (!userExits) {
            throw new Error('Invalid information provided.');
        }

        if (dto.confirmPassword !== dto.password) {
            throw new Error('Passwords do not match');
        }

        const hashPassword = await this.passwordHasher.hash(dto.password);
        await this.userProvider.updatePassword(userExits.getId(), hashPassword);
        return true;
    }
}