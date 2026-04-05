import { Status } from "prisma/generated/enums.js";

export interface PaymentMethodProps {
    id: string;
    name: string;
    status: Status;
}

export class PaymentMethod {
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly status: Status,
    ) { }

    public static fromPersistence(rawPaymentMethod: PaymentMethodProps): PaymentMethod {
        return new PaymentMethod(rawPaymentMethod.id, rawPaymentMethod.name, rawPaymentMethod.status);
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getStatus(): Status {
        return this.status;
    }
}   