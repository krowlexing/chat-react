import { useNavigate } from "react-router";

export function ChatPage() {
    const navigate = useNavigate();
    return (
        <>
            <div>TestPage</div>
            <button onClick={() => navigate("chats")}>Add chat</button>
        </>
    );
}
