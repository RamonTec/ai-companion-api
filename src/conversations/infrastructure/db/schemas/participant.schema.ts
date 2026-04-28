import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ParticipantDocument = Participant & Document;

@Schema({ timestamps: true, collection: 'participants' })
export class Participant extends Document {

    @Prop({
        type: String,
        required: true
    })
    userId: string;

    @Prop({
        type: Date,
        default: Date.now,
    })
    joinedAt: Date;

    @Prop({
        type: String,
        required: true
    })
    iaProfileId: string;
}

export const ParticipantsSchema = SchemaFactory.createForClass(Participant);
