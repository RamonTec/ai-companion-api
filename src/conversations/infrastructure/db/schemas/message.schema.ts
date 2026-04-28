import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type MessageDocument = Message & Document;

@Schema({ timestamps: true, collection: 'messages' })
export class Message extends Document {

    @Prop({
        type: Types.ObjectId,
        ref: 'Conversation',
        required: true
    })
    conversationId: string | Types.ObjectId;

    @Prop({
        type: String,
        required: true
    })
    senderId: string;

    @Prop({
        type: String,
        required: true
    })
    receiverId: string;

    @Prop({
        type: String,
        required: true
    })
    message: string;

    @Prop({
        type: Boolean,
        default: false
    })
    read: boolean;

    @Prop({
        type: Date,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: Date.now,
    })
    updatedAt: Date;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
