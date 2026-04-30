import { IConversationRepository } from '@/conversations/domain/port.js';
import { Inject } from '@nestjs/common';
import { ConversationDocument } from './schemas/conversation.schema.js';
import { MessageDocument } from './schemas/message.schema.js';
import { Model } from 'mongoose';
import {
  ICreateConversation,
  ISendMessage,
  IConversation,
  IMessage,
} from '@/conversations/domain/conversation.js';

export class ConversationImpl implements IConversationRepository {
  constructor(
    @Inject('ConversationModel')
    private conversationModel: Model<ConversationDocument>,
    @Inject('MessageModel') private messageModel: Model<MessageDocument>,
  ) { }

  private mapToConversationDomain(doc: ConversationDocument): IConversation {
    return {
      id: doc._id.toString(),
      participants: doc.participants,
      lastMessage: doc.lastMessage,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  private mapToMessageDomain(doc: MessageDocument): IMessage {
    return {
      id: doc._id.toString(),
      conversationId: doc.conversationId.toString(),
      senderId: doc.senderId,
      receiverId: doc.receiverId,
      message: doc.message,
      read: doc.read,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findConversationsByUser(userId: string): Promise<IConversation[]> {
    const docs = await this.conversationModel
      .find({ 'participants.userId': userId })
      .sort({ updatedAt: -1 })
      .exec();

    return docs.map((doc) => this.mapToConversationDomain(doc));
  }

  async createConversation(data: ICreateConversation): Promise<IConversation> {
    const { participantSenderId, participantReceiverId, message } = data;

    const conversation = new this.conversationModel({
      participants: {
        userId: participantSenderId,
        iaProfileId: participantReceiverId,
        joinedAt: new Date(),
      },
      lastMessage: message,
    });

    const savedConversation = await conversation.save();
    return this.mapToConversationDomain(savedConversation);
  }

  async sendMessage(messageData: ISendMessage): Promise<IMessage> {
    const newMessage = new this.messageModel({
      conversationId: messageData.conversationId,
      senderId: messageData.senderId,
      receiverId: messageData.receiverId,
      message: messageData.message,
      read: false,
    });
    const savedMessage = await newMessage.save();
    return this.mapToMessageDomain(savedMessage);
  }

  async findConversationById(convId: string): Promise<IConversation | null> {
    const doc = await this.conversationModel.findById(convId).exec();
    if (!doc) return null;
    return this.mapToConversationDomain(doc);
  }

  async findMessagesByConversation(
    convId: string,
    before?: Date,
    limit?: number,
  ): Promise<IMessage[]> {
    const query = { conversationId: convId };
    if (before) {
      query.createdAt = { $lt: before };
    }
    const docs = await this.messageModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit || 50)
      .exec();
    return docs.map((doc) => this.mapToMessageDomain(doc));
  }

  async updateLastMessage(convId: string, message: string): Promise<void> {
    await this.conversationModel
      .findByIdAndUpdate(convId, { lastMessage: message })
      .exec();
  }

  async markAsRead(
    convId: string,
    userId: string,
    messageId: string,
  ): Promise<void> {
    await this.messageModel.findByIdAndUpdate(messageId, { read: true }).exec();
  }
}
