import { RouteObject } from "react-router";
import { ChatPage } from "../pages/TestPage";
import { TestChatPage } from "../pages/TestChatPage";

export const testRouter: RouteObject[] = [
    {
        path: "",
        element: <ChatPage />,
    },
    {
        path: "chats",
        element: <TestChatPage />,
    },
];
