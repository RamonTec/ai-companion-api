import { AuthUser } from "@/auth/domain/ports.js";
import { IConversation, IMessage } from "./conversation.entities.js";
import { ConversationDomain } from "./conversation.js";

export abstract class IConversationRepository {
  abstract findConversationBtwUsers(senderId: string, receiverId: string): Promise<ConversationDomain | null>;
  abstract findConversationById(convId: string): Promise<ConversationDomain | null>;
  abstract save(conversation: ConversationDomain, pendingMessage?: string): Promise<void>;
  abstract findConversationsByUser(userId: string): Promise<IConversation[]>;
  abstract findMessagesByConversation(convId: string, before?: Date, limit?: number): Promise<IMessage[]>;
  abstract markAsRead(convId: string, userId: string, messageId: string): Promise<void>;
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