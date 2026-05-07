import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsUUID, Matches } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(72)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    })
    password: string;

    @IsString()
    passwordConfirmation: string;

    @IsString()
    @MinLength(3)
    firstName: string;

    @IsString()
    @MinLength(3)
    lastName: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    nickName: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(15)
    phone?: string;
}

export class VerifyEmailDto {
    @IsString()
    token: string;
}

export class ResetPasswordDto {
    @IsEmail()
    email: string;
}

export class RecoveryPasswordDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(72)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    })
    password: string;

    @IsString()
    passwordConfirmation: string;

    @IsUUID()
    token: string;
}

export class RefreshTokenDto {
    @IsString()
    refreshToken: string;
}
