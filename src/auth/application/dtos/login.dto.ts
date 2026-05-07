import { IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(72)
    password: string;

    ipAddress?: string;
    userAgent?: string;
}
