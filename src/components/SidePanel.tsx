import styled from "styled-components";
import { ProfileView } from "./ProfileView";
import { ChatListView } from "./ChatListView";
import { ChatData } from "../reducers/testChatReducer";
import { UserData } from "../data/UserData";

interface Props {
    me: UserData;
    chats: ChatData[];
    onChatClick: (id: number) => void;
}

export function SidePanel(props: Props) {
    const { me, chats, onChatClick } = props;

    return (
        <Centered>
            <ProfileView user={me} />
            <ChatListView chats={chats} onChatClick={onChatClick} />
            <AddChatButton>Add chat</AddChatButton>
        </Centered>
    );
}

const Centered = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    background: green;
    flex-grow: 0;
    max-width: 300px;
    overflow-x: hidden;
    @media (max-width: 800px) {
        display: none;
    }
`;
const AddChatButton = styled.button`
    width: 100%;

    margin: 15px;
`;
