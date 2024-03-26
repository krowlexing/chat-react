import { RouteObject } from "react-router";
import { TestPage } from "../pages/TestPage";
import { TestChatPage } from "../pages/TestChatPage";

export const testRouter: RouteObject[] = [
    {
        path: "",
        element: <TestPage />,
    },
    {
        path: "chats",
        element: <TestChatPage />,
    },
];
