import { IUserRepository } from "../../domain/ports.js";
import { User } from "../../domain/entities/user.entity.js";
import { UserRegisterDto } from "../dtos/user-register.dto.js";
import { CommonRepository } from "../../../common/ports.js";
import { INotificationChannel } from "../../../notifications/ports.js";

export class UserRegisterUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly commonRepository: CommonRepository,
        private readonly notificationService: INotificationChannel
    ) { }

    async execute(userRegisterDto: UserRegisterDto): Promise<User> {
        const user = await this.userRepository.findUserByNickNameOrEmail(userRegisterDto.nickName, userRegisterDto.email);
        if (user) {
            throw new Error('User already exists');
        }
        const hashedPassword = await this.commonRepository.hashPassword(userRegisterDto.password);
        const newUSerDomain = User.fromPersistence({
            email: userRegisterDto.email,
            password: hashedPassword,
            firstName: userRegisterDto.firstName,
            lastName: userRegisterDto.lastName,
            nickName: userRegisterDto.nickName,
            isVerified: false,
            role: 'USER',
        })

        const newUser = await this.userRepository.register(newUSerDomain);
        await this.notificationService.send(newUser.getEmail, 'Welcome', 'Welcome to our platform');
        return newUser;
    }
}