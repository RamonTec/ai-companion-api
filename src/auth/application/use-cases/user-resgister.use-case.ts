import { IAuthRepository } from "src/auth/domain/ports.js";
import { User } from "../../domain/entities/user.entity.js";

export class UserRegisterUseCase {
    constructor(private readonly authRepository: IAuthRepository) { }

    async execute(email: string, password: string): Promise<User> {
        return this.authRepository.register(email, password);
    }
}