import { Body, Controller, Post } from "@nestjs/common";
import { RegisterPaymentMethodUseCase } from "../application/use-cases/register-payment-method.use-case.js";
import { RegisterPaymentMethodDto } from "../application/dtos/register-payment-method.dto.js";
import { PaymentMethod } from "../domain/entities/payment-method.entity.js";

@Controller('payment-methods')
export class PaymentMethodController {
    constructor(private readonly paymentMethodUseCase: RegisterPaymentMethodUseCase) { }

    @Post('register')
    async register(@Body() registerPaymentMethodDto: RegisterPaymentMethodDto): Promise<PaymentMethod> {
        return await this.paymentMethodUseCase.execute(registerPaymentMethodDto);
    }
}