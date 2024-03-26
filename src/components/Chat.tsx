import { MessageList } from "./MessageList";
import { InputField } from "./InputField";
import { ChatContent } from "../data/Chat";
import { UserData } from "../data/UserData";

interface Props {
    chat: ChatContent;
    me: UserData;
    addMessage: (chatId: number, message: string) => void;
}

export function Chat(props: Props) {
    const { chat, me, addMessage } = props;

    return (
        <>
            <MessageList messages={chat.data} me={me} />
            <InputField onMessageSend={msg => addMessage(chat.chatId, msg)} />
        </>
    );
}
