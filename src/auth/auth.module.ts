import { Module } from "@nestjs/common";
import { AuthController } from "./presentation/auth.controller.js";
import { IAuthUserProvider, IPasswordHasher, ITokenProvider } from "./domain/ports.js";
import { TokenProviderImpl } from "./infrastructure/adapters/token-provider.impl.js";
import { PasswordHasherImpl } from "./infrastructure/adapters/password-hasher.impl.js";
import { AuthUserProviderImpl } from "./infrastructure/adapters/auth-user-provider.impl.js";
import { LoginUseCase } from "./application/use-cases/login.use-case.js";
import { ResetPasswordUseCase } from "./application/use-cases/reset-password.use-case.js";
import { RecoveryPasswordUseCase } from "./application/use-cases/recovery-password.use-case.js";
import { UserModule } from "@/users/user.module.js";
import { UserRegisterUseCase } from "@/users/application/use-cases/user-resgister.use-case.js";

@Module({
    imports: [UserModule], // Import UserModule if needed for UserRegisterUseCase and IUserRepository
    controllers: [AuthController],
    providers: [
        { provide: ITokenProvider, useClass: TokenProviderImpl },
        { provide: IPasswordHasher, useClass: PasswordHasherImpl },
        { provide: IAuthUserProvider, useClass: AuthUserProviderImpl },
        LoginUseCase,
        ResetPasswordUseCase,
        RecoveryPasswordUseCase,
    ],
    exports: [],
})
export class AuthModule { }