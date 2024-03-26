import styled from "styled-components";
import { UserData } from "../data/UserData";
import { ChatData } from "../reducers/testChatReducer";
import { ChatContent } from "../data/Chat";
import { useState } from "react";
import { SidePanel } from "../components/SidePanel";
import { ChatWindowView } from "../components/ChatWindowView";
import { DarkColor } from "../components/ChatCard";
import { InputField } from "../components/InputField";
import { Input } from "../components/Input";
import { Column } from "./AuthPage";

export function DemoPage() {
    const [currentChat, setCurrentChat] = useState<number | null>(null);

    const [username, setUsername] = useState("");
    const [modal, setModal] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const shouldShowMenu = currentChat == null || showMenu;
    const closeModal = () => setModal(false);

    const modalWindow = (
        <ModalBackground onClick={closeModal}>
            <Modal>
                <Column>
                    <Paragraph centered={true}>Add chat</Paragraph>
                    <Input onValue={setUsername} value={username} />
                    <button onClick={closeModal}>Add</button>
                </Column>
            </Modal>
        </ModalBackground>
    );

    const me: UserData = {
        id: 2,
        username: "krowlexing",
    };

    const chat =
        currentChat != null ? chatContents[currentChat - 1] : undefined;

    return (
        <Flex>
            <SidePanel
                hide={!shouldShowMenu}
                me={me}
                chats={chats}
                onChatClick={setCurrentChat}
                onAddChat={() => setModal(true)}
            />
            {chat ? (
                <ChatWindowView
                    onMenuClick={() => setShowMenu(prev => !prev)}
                    me={me}
                    chat={chat}
                    addMessage={() => {}}
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

const chats: ChatData[] = [
    {
        id: 1,
        description: "",
        title: "Катя",
    },
    {
        id: 2,
        description: "",
        title: "Костя",
    },
    {
        id: 3,
        description: "",
        title: "Степа",
    },
    {
        id: 4,
        description: "",
        title: "Кирилл",
    },
];

const chatContents: ChatContent[] = [
    {
        chatId: 1,
        title: "Катя",
        data: [
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 1,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
            {
                content: "test",
                sender: 2,
            },
        ],
    },
    {
        chatId: 2,
        title: "Костя",
        data: [
            {
                content: "test",
                sender: 2,
            },
        ],
    },
    {
        chatId: 3,
        title: "Дима",
        data: [
            {
                content: "test",
                sender: 2,
            },
        ],
    },
    {
        chatId: 4,
        title: "Степа",
        data: [
            {
                content: "test",
                sender: 2,
            },
        ],
    },
];
