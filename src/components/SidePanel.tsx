import styled from "styled-components";
import { ProfileView } from "./ProfileView";
import { ChatListView } from "./ChatListView";
import { ChatData } from "../reducers/testChatReducer";
import { UserData } from "../data/UserData";
import { DarkColor } from "./ChatCard";

interface Props {
    me: UserData;
    chats: ChatData[];
    hide?: boolean;
    onChatClick: (id: number) => void;
    onAddChat: () => void;
}

export function SidePanel(props: Props) {
    const { me, chats, hide, onChatClick, onAddChat } = props;

    return (
        <Centered hide={hide}>
            <ProfileView user={me} />
            <ChatListView chats={chats} onChatClick={onChatClick} />
            <AddChatButton onClick={onAddChat}>Add chat</AddChatButton>
        </Centered>
    );
}

const Centered = styled.div.attrs<{ hide?: boolean }>(props => props)`
    display: flex;
    background: ${DarkColor};
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    flex-grow: 0;
    max-width: 300px;
    overflow-x: hidden;

    ${props =>
        props.hide
            ? `@media (max-width: 800px) {
        display: none;
    }`
            : ""}
`;
const AddChatButton = styled.button`
    width: 100%;

    margin: 15px;
`;
