import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatWindowView } from "../components/ChatWindowView";
import { SidePanel } from "../components/SidePanel";
import {
    actions,
    useAppDispatch,
    useAppSelector,
} from "../reducers/testChatReducer";
import { AddChatModal } from "../components/AddChatModal";

export function ChatPage() {
    const [modal, setModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useAppDispatch();

    const { me, currentChat, chats, chat, newChatStatus } = useAppSelector(
        state => {
            return {
                currentChat: state.currentChatId,
                me: state.me,
                chats: state.chats,
                chat: state.chat,
                newChatStatus: state.newChatRequest.status,
            };
        },
    );

    useEffect(() => {
        if (currentChat !== undefined) {
            const interval = setInterval(() => {
                dispatch(actions.requestChat(currentChat));
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [dispatch, currentChat]);

    useEffect(() => {
        if (newChatStatus === "ok") {
            setModal(false);
            dispatch(actions.requestChats());
        }
    }, [dispatch, newChatStatus]);

    useEffect(() => {
        dispatch(actions.requestChats());
    }, [dispatch]);

    const closeModal = () => {
        dispatch(actions.newChatRequestNone());
        setModal(false);
    };
    const setCurrentChat = (chat: number) =>
        dispatch(actions.chatClicked(chat));

    const modalWindow = (
        <AddChatModal
            closeModal={closeModal}
            onAddClick={username => {
                dispatch(actions.requestNewChat(username));
            }}
        />
    );

    const shouldShowMenu = currentChat == null || showMenu;
    return (
        <Flex>
            <SidePanel
                hide={!shouldShowMenu}
                me={me.value!}
                chats={chats.value ?? []}
                onChatClick={setCurrentChat}
                onAddChat={() => setModal(true)}
            />
            {chat.value && me.value ? (
                <ChatWindowView
                    onMenuClick={() => setShowMenu(prev => !prev)}
                    me={me.value}
                    chat={chat.value}
                    addMessage={(chatId, text) =>
                        dispatch(actions.postMessage(chatId, text))
                    }
                />
            ) : null}

            {modal && modalWindow}
        </Flex>
    );
}

const Flex = styled.div`
    display: flex;
    padding: 10px;
    flex-grow: 1;
`;
