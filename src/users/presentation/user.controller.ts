import { Body, Controller, Post } from "@nestjs/common";
import { User } from "../domain/entities/user.entity.js";
import { UserRegisterDto } from "../application/dtos/user-register.dto.js";
import { UserRegisterUseCase } from "../application/use-cases/user-resgister.use-case.js";

@Controller('users')
export class UserController {
    constructor(private readonly userUseCase: UserRegisterUseCase) { }

    @Post('register')
    async register(@Body() userRegisterDto: UserRegisterDto): Promise<User> {
        return await this.userUseCase.execute(userRegisterDto);
    }
}