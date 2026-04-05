import { RegisterPaymentMethodDto } from "@/payment-methods/application/dtos/register-payment-method.dto.js";
import { PaymentMethod } from "@/payment-methods/domain/entities/payment-method.entity.js";
import { PaymentMethodRepository } from "@/payment-methods/domain/port.js";
import { PrismaClient } from "prisma/generated/client.js";

export class PrismaPaymentMethodImpl implements PaymentMethodRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async save(paymentMethod: RegisterPaymentMethodDto): Promise<PaymentMethod> {
        const prismaPaymentMethod = await this.prisma.paymentMethod.create({
            data: {
                name: paymentMethod.name,
                status: paymentMethod.status,
            },
        });

        return PaymentMethod.fromPersistence(prismaPaymentMethod);
    }
}