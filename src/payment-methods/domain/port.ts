import { PaymentMethod } from "./entities/payment-method.entity.js";
import { RegisterPaymentMethodDto } from "../application/dtos/register-payment-method.dto.js";

export abstract class PaymentMethodRepository {
    abstract save(paymentMethod: RegisterPaymentMethodDto): Promise<PaymentMethod>;
}