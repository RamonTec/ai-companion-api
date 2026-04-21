import { Body, Controller, Post, Req } from "@nestjs/common";
import { UserRegisterDto } from "../application/dtos/user-register.dto.js";
import { UserRegisterUseCase } from "../application/use-cases/user-resgister.use-case.js";


@Controller('auth')
export class AuthController {
    constructor(private readonly userRegisterUseCase: UserRegisterUseCase) { }

    @Post()
    register(@Body() dto: UserRegisterDto) {
        return this.userRegisterUseCase.execute(dto);
    }
}