import { useState } from "react";
import styled from "styled-components";

interface Props {
    onMessageSend: (message: string) => void;
}

export function InputField(props: Props) {
    const { onMessageSend } = props;

    const [value, setValue] = useState("");

    return (
        <Input
            onChange={e => setValue(e.target.value)}
            value={value}
            onKeyDown={e => {
                if (e.code === "Enter" && !e.shiftKey) {
                    onMessageSend(value);
                    setValue("");
                    e.preventDefault();
                }
            }}
        />
    );
}

const Input = styled.textarea`
    font-size: 1.2rem;
    min-height: 2lh;
    max-height: 2lh;
    flex: 1 1;
`;
