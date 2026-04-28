import { IConversationRepository } from "@/conversations/domain/port.js";
import { Inject } from "@nestjs/common";
import { Conversation, ConversationDocument } from "./schemas/conversation.schema.js";
import { Model } from "mongoose";
import { ICreateConversation } from "@/conversations/domain/conversation.js";
import { Participant } from "./schemas/participant.schema.js";
import { IConversation } from "@/conversations/domain/conversation.js";

export class ConversationImpl implements IConversationRepository {
    constructor(
        @Inject("IConversationRepository") private conversationModel: Model<ConversationDocument>
    ) { }

    async findConversationsByUser(userId: string): Promise<ConversationDocument[]> {
        const docs = await this.conversationModel
            .find({
                participants: {
                    $elemMatch: {
                        user: userId
                    }
                }
            })
            .sort({ updatedAt: -1 })
            .exec();

        return docs;
    }

    async createConversation(data: ICreateConversation): Promise<IConversation> {
        const { participantSenderId, participantReceiverId, message } = data;

        const participants = new Participant({
            userId: participantSenderId,
            iaProfileId: participantReceiverId,
            joinedAt: new Date(),
        });

        const conversation = new Conversation({
            participants: participants,
            lastMessage: message,
        });

        const savedConversation = await conversation.save();
        return savedConversation;
    }
}