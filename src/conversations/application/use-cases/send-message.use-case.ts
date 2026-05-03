import { ISendMessage } from '@/conversations/domain/conversation.entities.js';
import { ConversationDomain } from '@/conversations/domain/conversation.js';
import {
  IConversationRepository,
  IMessageAiModelProvider,
  IMessageUserProvider,
} from '@/conversations/domain/port.js';

export class SendMessageUseCase {
  constructor(
    private readonly userProvider: IMessageUserProvider,
    private readonly aiModelProvider: IMessageAiModelProvider,
    private readonly conversationRepo: IConversationRepository,
  ) { }

  async execute(dto: ISendMessage, userId: string): Promise<string> {
    const { senderId, receiverId, message } = dto;

    if (userId !== senderId) throw new Error('Unauthorized');

    const sender = await this.userProvider.findById(senderId);
    if (!sender) throw new Error('Invalid sender information');

    const aiModel = await this.aiModelProvider.findAiById(receiverId);
    if (!aiModel) throw new Error('Invalid receiver information');

    let conversation = await this.conversationRepo.findConversationBtwUsers(senderId, receiverId);

    if (!conversation) {
      conversation = ConversationDomain.createNew(
        senderId,
        receiverId,
        message,
        aiModel.status
      );
    } else {
      conversation.addMessage(message, aiModel.status);
    }

    await this.conversationRepo.save(conversation, message);
    return conversation.getLastMessage();
  }
}