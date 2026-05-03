import { IConversationRepository } from '@/conversations/domain/port.js';
import { Inject, Injectable } from '@nestjs/common';
import { ConversationDocument } from './schemas/conversation.schema.js';
import { MessageDocument } from './schemas/message.schema.js';
import { Model } from 'mongoose';
import { IConversation, IMessage } from '@/conversations/domain/conversation.entities.js';
import { ConversationDomain } from '@/conversations/domain/conversation.js';

@Injectable()
export class ConversationImpl implements IConversationRepository {
  constructor(
    @Inject('ConversationModel') private conversationModel: Model<ConversationDocument>,
    @Inject('MessageModel') private messageModel: Model<MessageDocument>,
  ) { }

  private mapToDomain(doc: ConversationDocument): ConversationDomain {
    return ConversationDomain.reconstitute(
      doc._id.toString(),
      doc.participants.userId,
      doc.participants.iaProfileId,
      doc.lastMessage,
      doc.updatedAt,
    );
  }

  private mapToPresentation(doc: ConversationDocument): IConversation {
    return {
      id: doc._id.toString(),
      participants: doc.participants,
      lastMessage: doc.lastMessage,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  private mapToMessageDTO(doc: MessageDocument): IMessage {
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

  async findConversationBtwUsers(senderId: string, receiverId: string): Promise<ConversationDomain | null> {
    const doc = await this.conversationModel.findOne({
      'participants.userId': senderId,
      'participants.iaProfileId': receiverId,
    }).exec();

    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findConversationById(convId: string): Promise<ConversationDomain | null> {
    const doc = await this.conversationModel.findById(convId).exec();
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async save(conversation: ConversationDomain, pendingMessage?: string): Promise<void> {
    const session = await this.conversationModel.db.startSession();
    session.startTransaction();

    try {
      await this.conversationModel.findByIdAndUpdate(
        conversation.getId(),
        {
          $set: {
            participants: {
              userId: conversation.getSenderId(),
              iaProfileId: conversation.getReceiverId(),
            },
            lastMessage: conversation.getLastMessage(),
            updatedAt: conversation.getUpdatedAt(),
          }
        },
        { upsert: true, session, new: true }
      );

      if (pendingMessage) {
        const newMessage = new this.messageModel({
          conversationId: conversation.getId(),
          senderId: conversation.getSenderId(),
          receiverId: conversation.getReceiverId(),
          message: pendingMessage,
          read: false,
        });
        await newMessage.save({ session });
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async findConversationsByUser(userId: string): Promise<IConversation[]> {
    const docs = await this.conversationModel
      .find({ 'participants.userId': userId })
      .sort({ updatedAt: -1 })
      .exec();

    return docs.map((doc) => this.mapToPresentation(doc));
  }

  async findMessagesByConversation(convId: string, before?: Date, limit?: number): Promise<IMessage[]> {
    const query: any = { conversationId: convId };
    if (before) {
      query.createdAt = { $lt: before };
    }
    const docs = await this.messageModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit || 50)
      .exec();
    return docs.map((doc) => this.mapToMessageDTO(doc));
  }

  async markAsRead(messageId: string): Promise<void> {
    await this.messageModel.findByIdAndUpdate(messageId, { read: true }).exec();
  }
}