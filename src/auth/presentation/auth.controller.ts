import { Body, Controller, Post, Req } from "@nestjs/common";
import { LoginDto } from "../application/dtos/login.dto.js";
import { LoginUseCase } from "../application/use-cases/login.use-case.js";
import { UserRegisterUseCase } from "@/users/application/use-cases/user-resgister.use-case.js";
import { UserRegisterDto } from "@/users/application/dtos/user-register.dto.js";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly userRegisterUseCase: UserRegisterUseCase,
        private readonly userLoginUseCase: LoginUseCase
    ) { }

    @Post('register')
    register(@Body() dto: UserRegisterDto) {
        return this.userRegisterUseCase.execute(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.userLoginUseCase.execute(dto);
    }
}