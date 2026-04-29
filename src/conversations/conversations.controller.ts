import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { SendMessageDto } from './application/dto/send-message.dto.js';
import { SendMessageUseCase } from './application/use-cases/send-message.use-case.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly sendMessage: SendMessageUseCase) {}

  @Post('/send-message')
  async register(@Body() dto: SendMessageDto) {
    return await this.sendMessage.execute(dto);
  }
}
