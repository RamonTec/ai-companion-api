export interface IConversation {
    id: string;
    participants: IParticipant;
    lastMessage: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IParticipant {
    userId: string;
    iaProfileId: string;
    joinedAt: Date;
}

export interface ICreateConversation {
    participantSenderId: string;
    participantReceiverId: string;
    message: string;
}

export interface IUpdateConversation {
    lastMessage: string;
}

export interface ISendMessage {
    conversationId: string;
    message: string;
    senderId: string;
    receiverId: string;
}

export interface IMessage {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    message: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}