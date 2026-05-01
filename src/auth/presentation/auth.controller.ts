import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req } from "@nestjs/common";
import { LoginDto } from "../application/dtos/login.dto.js";
import { LoginUseCase } from "../application/use-cases/login.use-case.js";
import { UserRegisterUseCase } from "@/users/application/use-cases/user-resgister.use-case.js";
import { UserRegisterDto } from "@/users/application/dtos/user-register.dto.js";
import { ResetPasswordUseCase } from "../application/use-cases/reset-password.use-case.js";
import { ResetPasswordDto } from "../application/dtos/reset-password.dto.js";
import { RecoveryPasswordDto } from "../application/dtos/recovery-password.dto.js";
import { RecoveryPasswordUseCase } from "../application/use-cases/recovery-password.use-case.js";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly userRegisterUseCase: UserRegisterUseCase,
        private readonly userLoginUseCase: LoginUseCase,
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
        private readonly recoveryPasswordUseCase: RecoveryPasswordUseCase,
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() dto: UserRegisterDto) {
        return this.userRegisterUseCase.execute(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.userLoginUseCase.execute(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto) {
        return this.resetPasswordUseCase.execute(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('recovery-password')
    updatePassword(@Body() dto: RecoveryPasswordDto) {
        return this.recoveryPasswordUseCase.execute(dto);
    }
}