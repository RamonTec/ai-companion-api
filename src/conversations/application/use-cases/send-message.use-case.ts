import { ISendMessage } from '@/conversations/domain/conversation.js';
import {
  IConversationRepository,
  IMessageUserProvider,
} from '@/conversations/domain/port.js';

export class SendMessageUseCase {
  constructor(
    private readonly userProvider: IMessageUserProvider,
    private readonly conversationRepo: IConversationRepository,
  ) { }

  async execute(dto: ISendMessage): Promise<string> {
    const { senderId, receiverId, message } = dto;
    const users = await this.userProvider.findUsersByIds([senderId, receiverId]);

    if (!users || users.length < 2) {
      throw new Error('Sender or receiver does not exist.');
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
    } else {
      await this.conversationRepo.sendMessage({
        senderId,
        receiverId,
        message,
      });
      await this.conversationRepo.updateLastMessage(conversation.id, message);
      return conversation.lastMessage;
    }
  }
}
