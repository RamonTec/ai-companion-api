import { Module } from "@nestjs/common";
import { ConversationsController } from "./conversations.controller.js";
import { SendMessageUseCase } from "./application/use-cases/send-message.use-case.js";
import { ConversationImpl } from "./infrastructure/db/conversation.impl.js";
import { IConversationRepository, IMessageAiModelProvider, IMessageUserProvider } from "./domain/port.js";
import { MessageAiModelProviderImpl } from "./infrastructure/adapters/message-ai-model-provider.impl.js";
import { MessageUserProviderImpl } from "./infrastructure/adapters/message-user-provider.impl.js";

@Module({
    controllers: [ConversationsController],
    providers: [
        { provide: IConversationRepository, useClass: ConversationImpl },
        { provide: IMessageUserProvider, useClass: MessageUserProviderImpl },
        { provide: IMessageAiModelProvider, useClass: MessageAiModelProviderImpl },
        SendMessageUseCase,
    ],
    exports: [],
})
export class ConversationModule { }