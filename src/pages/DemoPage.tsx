import styled from "styled-components";
import { UserData } from "../data/UserData";
import { ChatData } from "../reducers/testChatReducer";
import { ChatContent } from "../data/Chat";
import { useState } from "react";
import { SidePanel } from "../components/SidePanel";
import { ChatWindowView } from "../components/ChatWindowView";

export function DemoPage() {
    const [currentChat, setCurrentChat] = useState<number | null>(null);

    const me: UserData = {
        id: 2,
        username: "krowlexing",
    };

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

    const chat =
        currentChat != null ? chatContents[currentChat - 1] : undefined;
    return (
        <Flex>
            <SidePanel me={me} chats={chats} onChatClick={setCurrentChat} />
            {chat ? (
                <ChatWindowView me={me} chat={chat} addMessage={() => {}} />
            ) : null}
        </Flex>
    );
}

const Flex = styled.div`
    display: flex;
    background: cyan;
    padding: 10px;
    flex-grow: 1;
`;

const chatContents: ChatContent[] = [
    {
        chatId: 1,
        data: [
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 1,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
            {
                content: "bigger",
                sender: 2,
            },
        ],
    },
    {
        chatId: 2,
        data: [
            {
                content: "bigger",
                sender: 2,
            },
        ],
    },
    {
        chatId: 3,
        data: [
            {
                content: "bigger",
                sender: 2,
            },
        ],
    },
    {
        chatId: 4,
        data: [
            {
                content: "bigger",
                sender: 2,
            },
        ],
    },
];
