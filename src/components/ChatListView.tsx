import styled from "styled-components";
import { ChatData } from "../reducers/reducer";
import { ChatCard } from "./ChatCard";

interface Props {
    chats: ChatData[];
    onChatClick: (chatId: number) => void;
}

export function ChatListView(props: Props) {
    const { chats, onChatClick } = props;

    const chatCards = chats.map(chat => (
        <ChatCard chat={chat} onClick={() => onChatClick(chat.id)} />
    ));
    return <ChatListContainer>{chatCards}</ChatListContainer>;
}

const ChatListContainer = styled.div`
    margin-top: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    margin-left: 15px;
    margin-right: 15px;
    flex-grow: 1;

    overflow-y: scroll;
`;
