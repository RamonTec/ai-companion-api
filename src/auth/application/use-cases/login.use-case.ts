import { LoginDto } from "../dtos/login.dto.js";
import { IAuthUserProvider, IPasswordHasher, ITokenProvider } from "../../domain/ports.js";

export class LoginUseCase {
    constructor(
        private readonly userProvider: IAuthUserProvider,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenProvider: ITokenProvider,
    ) { }

    async execute(dto: LoginDto): Promise<{ access_token: string }> {
        const userExits = await this.userProvider.findByEmail(dto.email);
        if (!userExits) {
            throw new Error('Invalid information provided.');
        }

        const isPasswordValid = await this.passwordHasher.compare(dto.password, userExits.getPassword());
        if (!isPasswordValid) {
            throw new Error('Invalid information provided.');
        }

        return this.tokenProvider.generate(userExits.getEmail(), userExits.getNickName(), userExits.getRole());
    }
}