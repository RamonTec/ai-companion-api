

export class RegisterIaModelDto {
    name: string;
    description: string;
    category: string;
    personality: string;
    provider: string;
    providerModelId: string;
    basePrompt: string;
    temperature: number;
    topP: number;
    voiceId: string;
    knowledgeBaseId: string;
    requiredTier: string;
    maxTokens: number;
}