import { ChatList } from "../components/ChatList";
import { CreateChat } from "../components/CreateChat";
import {
    actions,
    useAppDispatch,
    useAppSelector,
} from "../reducers/testChatReducer";
import { Chat } from "../components/Chat";
import styled from "styled-components";
import { DarkColor } from "../components/ChatCard";
import { ProfileView } from "../components/ProfileView";
import { useEffect } from "react";

export function TestChatPage() {
    const dispatch = useAppDispatch();
    const chat = useAppSelector(state => state.chat);
    const me = useAppSelector(state => state.me);
    const currentChatId = useAppSelector(state => state.currentChatId);

    useEffect(() => {
        if (me.status === "none" || me.status === "pending") {
            dispatch(actions.requestMe());
        }
    }, [dispatch, me.status]);

    useEffect(() => {
        if (currentChatId !== undefined) {
            const interval = setInterval(() => {
                dispatch(actions.requestChat(currentChatId));
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [dispatch, currentChatId]);

    return (
        <Flex>
            <Centered>
                <div />
                <div>
                    {me.status}

                    <ProfileView user={me.value!} />
                    <ChatList />
                </div>
                <div>
                    <CreateChat onCreateChat={() => {}} />
                </div>
            </Centered>
            <ChatContainer>
                {chat.status == "none" ? "no chat selected" : ""}
                {chat.value != undefined ? (
                    <Chat
                        chat={chat.value!}
                        addMessage={(chatId, text) =>
                            dispatch(actions.postMessage(chatId, text))
                        }
                        me={me.value!}
                    />
                ) : (
                    ""
                )}
            </ChatContainer>
        </Flex>
    );
}

const Flex = styled.div`
    display: flex;
    width: inherit;
    height: inherit;
`;

const Centered = styled(Flex)`
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
`;

const ChatContainer = styled.div`
    flex-grow: 1;
    max-width: 100rem;

    margin: 3rem;
    height: 50rem;
    background-color: ${DarkColor};
`;
