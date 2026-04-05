import { IsEmail, IsString, MinLength } from "class-validator";

export class UserRegisterDto {
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6)
    password: string;
    @IsString()
    @MinLength(6)
    confirmPassword: string;
    @IsString()
    @MinLength(3)
    firstName: string;
    @IsString()
    @MinLength(3)
    lastName: string;
    @IsString()
    @MinLength(3)
    nickName: string;
}