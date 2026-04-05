export class User {
    private constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly email: string,
        private readonly password: string,
        private readonly createdAt: Date,
        private readonly updatedAt: Date,
        private readonly firstName: string,
        private readonly lastName: string,
        private readonly isVerified: boolean,
        private readonly nickName: string,
        private readonly role: string,
        private readonly phone?: string,
        private readonly paymentMethod?: string[],
        private readonly subscription?: string
    ) { }


}