import { useNavigate } from "react-router";

export function TestPage() {
    const navigate = useNavigate();
    return (
        <>
            <div>TestPage</div>
            <button onClick={() => navigate("chats")}>Add chat</button>
        </>
    );
}
