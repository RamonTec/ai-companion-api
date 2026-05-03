export class ConversationDomain {
    private constructor(
        private readonly id: string,
        private readonly participantSenderId: string,
        private readonly participantReceiverId: string,
        private lastMessage: string,
        private updatedAt: Date,
    ) { }

    static reconstitute(id: string, senderId: string, receiverId: string, lastMessage: string, updatedAt: Date): ConversationDomain {
        return new ConversationDomain(id, senderId, receiverId, lastMessage, updatedAt);
    }

    static createNew(senderId: string, receiverId: string, firstMessage: string, aiModelStatus: string): ConversationDomain {
        if (senderId === receiverId) {
            throw new Error('A user cannot start a conversation with themselves');
        }

        const conversation = new ConversationDomain(
            crypto.randomUUID(),
            senderId,
            receiverId,
            firstMessage,
            new Date(),
        );

        conversation.validateAiStatus(aiModelStatus);
        return conversation;
    }

    public addMessage(message: string, aiModelStatus: string): void {
        this.validateAiStatus(aiModelStatus);
        this.lastMessage = message;
        this.updatedAt = new Date();
    }

    private validateAiStatus(aiModelStatus: string): void {
        if (aiModelStatus !== 'ACTIVE') {
            throw new Error('Cannot send messages to an inactive AI Model');
        }
    }

    public getId(): string { return this.id; }
    public getSenderId(): string { return this.participantSenderId; }
    public getReceiverId(): string { return this.participantReceiverId; }
    public getLastMessage(): string { return this.lastMessage; }
    public getUpdatedAt(): Date { return this.updatedAt; }
}