import { useEffect, useState } from "react";
import styled from "styled-components";
import { DarkColor } from "../components/ChatCard";
import { ChatWindowView } from "../components/ChatWindowView";
import { Input } from "../components/Input";
import { SidePanel } from "../components/SidePanel";
import { Column } from "./AuthPage";
import {
    actions,
    useAppDispatch,
    useAppSelector,
} from "../reducers/testChatReducer";

export function ChatPage() {
    const [username, setUsername] = useState("");
    const [modal, setModal] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useAppDispatch();
    const currentChat = useAppSelector(state => state.currentChatId);
    const setCurrentChat = (chat: number) =>
        dispatch(actions.chatClicked(chat));
    const me = useAppSelector(state => state.me);

    const chats = useAppSelector(state => state.chats);
    const chat = useAppSelector(state => state.chat);
    const newChatStatus = useAppSelector(state => state.newChatRequest.status);
    const shouldShowMenu = currentChat == null || showMenu;
    const closeModal = () => {
        dispatch(actions.newChatRequestNone());
        setModal(false);
    };

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

    const modalWindow = (
        <ModalBackground
            onClick={() => {
                console.log("clicked on modalbackground");
                closeModal();
            }}
        >
            <Modal
                onClick={e => {
                    console.log("clicked on modal");

                    e.stopPropagation();
                }}
            >
                <Column>
                    <Paragraph centered={true}>Add chat</Paragraph>
                    <Input onValue={setUsername} value={username} />
                    <button
                        onClick={() => {
                            dispatch(actions.requestNewChat(username));
                        }}
                    >
                        Add
                    </button>
                </Column>
            </Modal>
        </ModalBackground>
    );

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

const Paragraph = styled.p.attrs<{ centered?: boolean }>(props => props)`
    font-size: 1.2rem;
    ${props => (props.centered ? "text-align: center;" : "")}
`;

const Modal = styled.div`
    padding: 10px;
    border-radius: 10px;
    display: flex;
    background: ${DarkColor};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalBackground = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    flex: 1;
`;

const Flex = styled.div`
    display: flex;
    padding: 10px;
    flex-grow: 1;
`;
