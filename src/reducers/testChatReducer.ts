/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Action,
    UnknownAction,
    applyMiddleware,
    legacy_createStore as createStore,
} from "redux";
import { action, newReducer } from "./lib";
import { ThunkAction, ThunkDispatch, thunk } from "redux-thunk";
import {
    chats,
    getChat,
    getMe,
    getUsers,
    postMessageToChat,
} from "../network/network";
import { useDispatch, useSelector } from "react-redux";
import { PromiseResult, makeRequestThunk, state } from "./thunker_lib";
import { AxiosResponse } from "axios";
import { ChatContent } from "../data/Chat";
import { UserData } from "../data/UserData";

export type ChatData = {
    id: number;
    title: string;
    description: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeThunk<Args extends any[]>(
    func: (...args: Args) => ThunkAction<void, State, void, Action>,
) {
    return func;
}

function makeThunker<
    Args extends any[],
    P extends keyof State & string,
    T,
    _ extends State[P] & T,
>(name: P, fun: (...args: Args) => Promise<T>) {
    const thunkMaker =
        (...args: Args) =>
        () =>
            fun(...args);
    return makeRequestThunk(name, thunkMaker, {}, state<State>());
}

function makeAxiosThunk<
    Args extends any[],
    P extends keyof State & string,
    T,
    _ extends State[P] & T,
>(name: P, fun: (...args: Args) => Promise<AxiosResponse<T, any>>) {
    const thunkMaker =
        (...args: Args) =>
        () =>
            fun(...args).then(response => response.data);
    return makeRequestThunk(name, thunkMaker, {}, state<State>());
}

const [requestChats, chatsHandlers] = makeAxiosThunk("chats", () => {
    return chats();
});

const [requestUsers, usersHandlers] = makeAxiosThunk("users", () => {
    return getUsers();
});

const [requestChat, chatHandlers] = makeAxiosThunk("chat", (id: number) => {
    return getChat(id);
});

const [requestMe, meHandlers] = makeAxiosThunk("me", () => {
    return getMe();
});
const [postMessage, messageHandlers] = makeRequestThunk(
    "postMessage",
    (id: number, text: string) => dispatch => {
        return postMessageToChat(id, text).then(response => {
            dispatch(requestChat(id));
            return response.data;
        });
    },
    {},
    state<State>(),
);

type State = {
    value: number;
    currentChatId: number | undefined;
    userId: number | undefined;
    me: PromiseResult<UserData>;
    chats: PromiseResult<ChatData[]>;
    users: PromiseResult<{ username: string }[]>;
    chat: PromiseResult<ChatContent>;
    postMessage: PromiseResult<boolean>;
};

const increment = action("increment")<number>();
const decrement = action("decrement")<number>();
const chatSwitch = action("chatSwitch")<number>();

const chatClicked = makeThunk((id: number) => dispatch => {
    dispatch(requestChat(id));
    dispatch(actions.chatSwitch(id));
});

const [reducer, actions] = newReducer<State>({
    value: 0,
    currentChatId: undefined,
    me: { status: "none" },
    userId: undefined,
    chats: { status: "none" },
    users: { status: "none" },
    chat: { status: "none" },
    postMessage: { status: "none" },
})
    .handle(increment, (state, n) => {
        return { ...state, value: state.value + n };
    })
    .handle(decrement, state => {
        return { ...state, value: state.value - 1 };
    })
    .handle(chatSwitch, (state, newChatId) => {
        return { ...state, currentChatId: newChatId };
    })
    .handleThunker(usersHandlers)
    .handleThunker(messageHandlers)
    .handleThunker(chatHandlers)
    .handleThunker(meHandlers)
    .handleThunker(chatsHandlers)
    .done();

const store = createStore(reducer, applyMiddleware(thunk));

const allActions = {
    ...actions,
    requestChats,
    requestUsers,
    chatClicked,
    postMessage,
    requestChat,
    requestMe,
};

export { store as testChatStore };
export { allActions as actions };
export type { State as TestChatState };

export type AppDispatch = ThunkDispatch<State, void, UnknownAction>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<State>();
