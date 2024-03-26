import styled from "styled-components";
import { Chat } from "./Chat";
import { ChatContent } from "../data/Chat";
import { DarkColor } from "./ChatCard";
import { UserData } from "../data/UserData";

interface Props {
    chat: ChatContent;
    me: UserData;
    addMessage: (chatId: number, text: string) => void;
}

export function ChatWindowView(props: Props) {
    const { me, chat, addMessage } = props;

    return (
        <FlexWidth>
            <Row>
                <ActionButton>МЭНЮ </ActionButton>
                <EmptySpace mediaMaxWidth={800} />
                <ChatTitle>{chat.chatId}</ChatTitle>
                <EmptySpace />
            </Row>

            <ChatContainer>
                <Chat me={me} chat={chat} addMessage={addMessage} />
            </ChatContainer>
        </FlexWidth>
    );
}

const ActionButton = styled.div`
    flex: 1;
    @media (min-width: 800px) {
        display: none;
        flex: 0;
    }
`;

const EmptySpace = styled.div.attrs<{ mediaMaxWidth?: number }>(props => props)`
    flex: 1;

    ${props =>
        props.mediaMaxWidth
            ? `@media (max-width: ${props.mediaMaxWidth}px) {
        display: none;
        flex: 0;
    }`
            : ""}
`;

const Row = styled.div`
    display: flex;
    background: #003090;
    justify-content: space-between;
    align-items: center;
`;

const ChatTitle = styled.div`
    font-size: 2rem;
    min-height: 2rem;
    text-align: center;
    flex: 1;
`;

const FlexWidth = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: white;
`;

const ChatContainer = styled(FlexWidth)`
    flex-direction: column;
    justify-content: flex-end;
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
    background-color: ${DarkColor};
`;
