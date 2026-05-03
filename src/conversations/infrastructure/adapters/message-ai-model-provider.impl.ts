import { Injectable } from '@nestjs/common';
import { IMessageAiModelProvider, ConversationAiModel } from '@/conversations/domain/port.js';
import { IaModelRepository } from '@/ia-models/domain/ports.js';

@Injectable()
export class MessageAiModelProviderImpl implements IMessageAiModelProvider {
    constructor(
        private readonly aiModelRepository: IaModelRepository,
    ) { }

    async findAiById(id: string): Promise<ConversationAiModel | null> {
        const iaModel = await this.aiModelRepository.findById(id);
        if (!iaModel) return null;

        return {
            id: (iaModel as any).id || id,
            status: (iaModel as any).isActive ? 'ACTIVE' : 'INACTIVE',
        };
    }
}
