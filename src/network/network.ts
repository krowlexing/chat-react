import axios from "axios";

const savedToken = localStorage.getItem("token") ?? "";
export const token = {
    value: savedToken,
    req: axios.create({
        headers: { Authorization: savedToken },
    }),
    update: (newToken: string) => {
        token.value = newToken;
        localStorage.setItem("token", newToken);
        token.req = axios.create({
            headers: { Authorization: token.value },
        });
    },
};

export function getUsers() {
    return axios.get("/api/users");
}

export function postRegister(username: string, password: string) {
    return axios.post("/api/auth/register", { username, password });
}

export function postLogin(username: string, password: string) {
    return axios.post("/api/auth/login", { username, password });
}

export function checkAuth() {
    return token.req.get("/api/auth/check");
}

export function getMe() {
    return token.req.get("/api/user/me");
}

export function newChat(title: string, description: string, users: string[]) {
    return token.req.post("/api/chat/new", { title, description, users });
}

export function chats() {
    return token.req.get("/api/chats");
}

export function getChat(id: number) {
    return token.req.get(`/api/chat/${id}`);
}

export function postMessageToChat(id: number, message: string) {
    return token.req.post(`/api/chat/${id}/message`, { message });
}

export function leaveChat(chat: number) {
    return token.req.delete(`/api/chat/${chat}`);
}
