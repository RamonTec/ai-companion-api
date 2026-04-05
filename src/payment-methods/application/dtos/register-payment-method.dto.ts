import { IsNotEmpty, IsString } from "class-validator";
import { Status } from "prisma/generated/enums.js";

export class RegisterPaymentMethodDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    status: Status;

}