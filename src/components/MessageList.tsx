import styled from "styled-components";
import { Message } from "./Message";
import { MessageData } from "../data/MessageData";
import { useEffect, useRef } from "react";
import { UserData } from "../data/UserData";

interface Props {
    me: UserData;
    messages: MessageData[];
}

export function MessageList(props: Props) {
    const { messages, me } = props;

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current != null) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [messages]);

    const messageComponents = props.messages.map(m => (
        <Message key={m.content} message={m} user={me.id} />
    ));

    return <Container ref={ref}>{messageComponents}</Container>;
}

const Container = styled.div`
    overflow: scroll;
`;
