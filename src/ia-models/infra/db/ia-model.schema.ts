import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type IaModelDocument = IaModel & Document;

@Schema({ timestamps: true, collection: 'ia_models' })
export class IaModel extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    category: string;

    @Prop()
    personality: string;

    @Prop({ required: true })
    provider: string;

    @Prop({ required: true })
    providerModelId: string;

    @Prop({ required: true })
    basePrompt: string;

    @Prop({ default: 0.7 })
    temperature: number;

    @Prop({ default: 1.0 })
    topP: number;

    @Prop()
    voiceId: string;

    @Prop()
    knowledgeBaseId: string;

    @Prop({ required: true, enum: ['FREE', 'PRO', 'ULTRA'], default: 'FREE' })
    requiredTier: string;

    @Prop({ default: 2048 })
    maxTokens: number;
}

export const IaModelSchema = SchemaFactory.createForClass(IaModel);