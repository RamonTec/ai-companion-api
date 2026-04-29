import { ISendMessage } from '@/conversations/domain/conversation.js';
import {
  IConversationRepository,
  IMessageUserProvider,
} from '@/conversations/domain/port.js';

export class SendMessageUseCase {
  constructor(
    private readonly userProvider: IMessageUserProvider,
    private readonly conversationRepo: IConversationRepository,
  ) {}

  async execute(dto: ISendMessage): Promise<string> {
    const { senderId, receiverId, message } = dto;
    const senderExists = await this.userProvider.findById(senderId);

    if (!senderExists) {
      throw new Error('Sender does not exist.');
    }
    const receiverExists = await this.userProvider.findById(receiverId);

    if (!receiverExists) {
      throw new Error('Receiver does not exist.');
    }

    let conversation = await this.conversationRepo.findConversationBtwUsers(
      senderId,
      receiverId,
    );

    if (!conversation) {
      conversation = await this.conversationRepo.createConversation({
        participantSenderId: senderId,
        participantReceiverId: receiverId,
        message,
      });

      return conversation.lastMessage;
    }
  }
}
