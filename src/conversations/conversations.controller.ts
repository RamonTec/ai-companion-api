import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { SendMessageDto } from './application/dto/send-message.dto.js';
import { SendMessageUseCase } from './application/use-cases/send-message.use-case.js';
import { AuthGuard } from '@/common/guards/auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly sendMessage: SendMessageUseCase) { }

  @UseGuards(AuthGuard)
  @Post('/send-message')
  async register(@Body() dto: SendMessageDto, @Req() req: Request) {
    return await this.sendMessage.execute(dto, req.user.id);
  }
}
