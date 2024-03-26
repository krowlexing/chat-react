import { useState } from "react";
import { postRegister } from "../network/network";

interface Props {
    onToken: (token: string) => void;
}

export function Register(props: Props) {
    const { onToken } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [response, setResponse] = useState("");

    return (
        <>
            <p>{response}</p>
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
            <button
                onClick={() =>
                    postRegister(username, password).then(res => {
                        console.log(JSON.stringify(res.data));
                        //onToken(res.data);
                    })
                }
            >
                Register
            </button>
        </>
    );
}
