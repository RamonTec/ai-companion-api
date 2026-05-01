import { IsString, MaxLength, MinLength } from "class-validator";


export class RegisterIaModelDto {
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(250)
    description: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    category: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    personality: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    provider: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    providerModelId: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    basePrompt: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    temperature: number;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    topP: number;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    voiceId: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    knowledgeBaseId: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    requiredTier: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    maxTokens: number;
}