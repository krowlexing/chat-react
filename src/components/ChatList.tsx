import {
    actions,
    useAppDispatch,
    useAppSelector,
} from "../reducers/testChatReducer";
import styled from "styled-components";
import { ChatListView } from "./ChatListView";

interface Props {}

export function ChatList(_: Props) {
    const dispatch = useAppDispatch();
    const chats = useAppSelector(state => state.chats);

    const requestChats = () => dispatch(actions.requestChats());
    const chatClicked = (id: number) => dispatch(actions.chatClicked(id));
    return (
        <div>
            <div>status: {chats.status}</div>
            <Button onClick={requestChats}>Request chats</Button>
            <ChatListView chats={chats.value!} onChatClick={chatClicked} />
        </div>
    );
}

export const Button = styled.button``;
