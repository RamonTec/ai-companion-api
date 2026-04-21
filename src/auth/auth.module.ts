import { Module } from "@nestjs/common";
import { UserRegisterUseCase } from "./application/use-cases/user-resgister.use-case.js";
import { IAuthRepository } from "./domain/ports.js";
import { AuthController } from "./presentation/auth.controller.js";


@Module({
    controllers: [AuthController],
    providers: [
        {
            provide: IAuthRepository,
            useClass: AuthRepositoryImpl,
        }
    ],
    exports: [UserRegisterUseCase],
})
export class AuthModule { }