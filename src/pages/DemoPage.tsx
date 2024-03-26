import styled from "styled-components";
import { UserData } from "../data/UserData";
import { ChatData } from "../reducers/testChatReducer";
import { ChatContent } from "../data/Chat";
import { useState } from "react";
import { SidePanel } from "../components/SidePanel";
import { ChatWindowView } from "../components/ChatWindowView";
import { AddChatModal } from "../components/AddChatModal";

export function DemoPage() {
    const [currentChat, setCurrentChat] = useState<number | null>(null);

    const [modal, setModal] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const shouldShowMenu = currentChat == null || showMenu;
    const closeModal = () => setModal(false);

    const modalWindow = (
        <AddChatModal closeModal={closeModal} onAddClick={() => {}} />
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
