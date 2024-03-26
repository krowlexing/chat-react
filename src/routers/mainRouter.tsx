import { redirect } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { getMe, token } from "../network/network";
import { AuthPage } from "../pages/AuthPage";
import { MainPage } from "../pages/MainPage";
import { testRouter } from "./testRouter";
import { actions, testChatStore } from "../reducers/testChatReducer";
import { DemoPage } from "../pages/DemoPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthPage />,
        loader: async () => {
            try {
                if (token.value === "") {
                    return null;
                }
                const me = await getMe();
                testChatStore.dispatch(actions.meOk(me.data));
                return redirect("/test/chats");
            } catch {
                return null;
            }
        },
    },
    {
        path: "/demo",
        element: <DemoPage />,
    },
    {
        path: "/test",
        children: testRouter,
        loader: async () => {
            try {
                if (token.value === "") {
                    return redirect("/");
                }
                const me = await getMe();
                testChatStore.dispatch(actions.meOk(me.data));
                return null;
            } catch {
                return redirect("/");
            }
        },
    },
    {
        path: "/app",
        element: <MainPage />,
    },
]);
