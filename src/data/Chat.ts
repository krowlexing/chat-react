import { MessageData } from "./MessageData";

export interface ChatContent {
    chatId: number;
    title: string;
    data: MessageData[];
}
