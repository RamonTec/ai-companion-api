import type {
  IConversation,
  ICreateConversation,
  IMessage,
  ISendMessage,
} from './conversation.js';

export abstract class IConversationRepository {
  abstract createConversation(
    data: ICreateConversation,
  ): Promise<IConversation>;
  abstract findConversationById(convId: string): Promise<IConversation | null>;
  abstract findConversationsByUser(userId: string): Promise<IConversation[]>;
  abstract sendMessage(message: ISendMessage): Promise<IMessage>;
  abstract findMessagesByConversation(
    convId: string,
    before?: Date,
    limit?: number,
  ): Promise<IMessage[]>;
  abstract updateLastMessage(convId: string, message: string): Promise<void>;
  abstract markAsRead(
    convId: string,
    userId: string,
    messageId: string,
  ): Promise<void>;
  abstract findConversationBtwUsers(
    senderId: string,
    receiverId: string,
  ): Promise<IConversation | null>;
}

export abstract class IMessageUserProvider {
  abstract findById(id: string): Promise<AuthUser | null>;
  abstract findUsersByIds(ids: string[]): Promise<AuthUser[]>;
}