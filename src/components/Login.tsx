import { useState } from "react";
import { postLogin } from "../network/network";
import { useAppDispatch } from "../reducers/testChatReducer";

interface Props {
    onToken: (token: string) => void;
}

export function Login(props: Props) {
    const { onToken } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();

    return (
        <>
            <p>Login</p>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button
                onClick={() =>
                    postLogin(username, password).then(res => {
                        onToken(res.data);
                    })
                }
            >
                Login
            </button>
        </>
    );
}
