
export interface IaModel {
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

export interface IaModelCreate {
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