import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Participant } from "./participant.schema.js";

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true, collection: 'conversations' })
export class Conversation extends Document {

    @Prop({
        type: Object,
        required: true,
        default: {},
    })
    participants: Participant;

    @Prop({
        type: String,
        required: true,
        default: "",
    })
    lastMessage: string;

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

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
