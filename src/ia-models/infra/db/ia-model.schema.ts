import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type IaModelDocument = IaModel & Document;

@Schema({ timestamps: true, collection: 'ia_models' })
export class IaModel extends Document {
    @Prop({ required: true, minLength: 2, maxLength: 200 })
    name: string;

    @Prop({ required: true, minLength: 3, maxLength: 250 })
    description: string;

    @Prop({ required: true, minLength: 3, maxLength: 100 })
    category: string;

    @Prop({ required: true, minLength: 3, maxLength: 100 })
    personality: string;

    @Prop({ required: true, minLength: 3, maxLength: 100 })
    provider: string;

    @Prop({ required: true, minLength: 3, maxLength: 100 })
    providerModelId: string;

    @Prop({ required: true, minLength: 3, maxLength: 2000 })
    basePrompt: string;

    @Prop({ default: 0.7, minLength: 0, maxLength: 2 })
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

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop({ default: true })
    isActive: boolean;
}

export const IaModelSchema = SchemaFactory.createForClass(IaModel);