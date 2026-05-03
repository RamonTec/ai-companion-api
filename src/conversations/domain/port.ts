import { AuthUser } from "@/auth/domain/ports.js";
import { IConversation, IMessage } from "./conversation.entities.js";
import { ConversationDomain } from "./conversation.js";

export interface IConversationRepository {
  findConversationBtwUsers(senderId: string, receiverId: string): Promise<ConversationDomain | null>;
  findConversationById(convId: string): Promise<ConversationDomain | null>;
  save(conversation: ConversationDomain, pendingMessage?: string): Promise<void>;
  findConversationsByUser(userId: string): Promise<IConversation[]>;
  findMessagesByConversation(convId: string, before?: Date, limit?: number): Promise<IMessage[]>;
  markAsRead(convId: string, userId: string, messageId: string): Promise<void>;
}

export abstract class IMessageUserProvider {
  abstract findById(id: string): Promise<AuthUser | null>;
  abstract findUsersByIds(ids: string[]): Promise<AuthUser[]>;
}

export interface ConversationAiModel {
  id: string;
  status: string;
}

export abstract class IMessageAiModelProvider {
  abstract findAiById(id: string): Promise<ConversationAiModel | null>;
}