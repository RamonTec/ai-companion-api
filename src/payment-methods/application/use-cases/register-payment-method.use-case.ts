import { PaymentMethodRepository } from "../../domain/port.js";
import { RegisterPaymentMethodDto } from "../dtos/register-payment-method.dto.js";
import { PaymentMethod } from "../../domain/entities/payment-method.entity.js";

export class RegisterPaymentMethodUseCase {
    constructor(
        private readonly paymentMethodRepository: PaymentMethodRepository,
    ) { }

    async execute(input: RegisterPaymentMethodDto): Promise<PaymentMethod> {
        return this.paymentMethodRepository.save(input);
    }
}