import { useState } from "react";

interface Props {
    onLoginClick: (usersname: string, password: string) => void;
}

export function Login(props: Props) {
    const { onLoginClick } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            <button onClick={() => onLoginClick(username, password)}>
                Login
            </button>
        </>
    );
}
