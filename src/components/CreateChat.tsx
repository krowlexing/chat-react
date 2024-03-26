import { useState } from "react";
import { newChat } from "../network/network";
import { Input } from "./Input";

interface Props {
    onCreateChat: (chatId: number) => void;
}

export function CreateChat(props: Props) {
    const { onCreateChat } = props;
    const [value, setValue] = useState("");

    return (
        <div>
            <div>
                <label>
                    Username
                    <Input value={value} onValue={setValue} />
                </label>
            </div>
            <button
                onClick={() =>
                    newChat("", "", [value]).then(res =>
                        onCreateChat(res.data.id),
                    )
                }
            >
                New chat
            </button>
        </div>
    );
}
