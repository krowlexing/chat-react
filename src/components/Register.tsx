import { useState } from "react";

interface Props {
    onRegisterClick: (usersname: string, password: string) => void;
}

export function Register(props: Props) {
    const { onRegisterClick } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <p>Registration</p>
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
            <button onClick={() => onRegisterClick(username, password)}>
                Register
            </button>
        </>
    );
}
