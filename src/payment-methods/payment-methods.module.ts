import { Module } from "@nestjs/common";
import { RegisterPaymentMethodUseCase } from "./application/use-cases/register-payment-method.use-case.js";
import { PaymentMethodRepository } from "./domain/port.js";
import { PrismaPaymentMethodImpl } from "./infrastructure/db/prisma-payment-method.impl.js";
import { PrismaClient } from "prisma/generated/client.js";
import { PaymentMethodController } from "./presentation/payment-method.controller.js";


@Module({
    controllers: [PaymentMethodController],
    providers: [
        {
            provide: PaymentMethodRepository,
            useFactory: (prisma: PrismaClient) => new PrismaPaymentMethodImpl(prisma),
            inject: [PrismaClient],
        },
        {
            provide: RegisterPaymentMethodUseCase,
            useFactory: (paymentMethodRepository: PaymentMethodRepository) => new RegisterPaymentMethodUseCase(paymentMethodRepository),
            inject: [PaymentMethodRepository],
        },
    ],
    exports: [RegisterPaymentMethodUseCase],
})
export class PaymentMethodsModule { }
