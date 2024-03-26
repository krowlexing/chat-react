import styled from "styled-components";
import { MessageData } from "../data/MessageData";

interface Props {
    user: number;
    message: MessageData;
}

export function Message(props: Props) {
    let x;
    if (props.message.sender === props.user) {
        x = (
            <MessageBody>
                <p>{props.message.content}</p>
            </MessageBody>
        );
    } else {
        x = (
            <MessageRightBody>
                <p>{props.message.content}</p>
            </MessageRightBody>
        );
    }

    return x;
}

const MessageBody = styled.div`
    background-color: lightblue;
    color: black;
    padding: 0px 10px 0px 10px;
    width: fit-content;
    margin-left: 10px;
    align-self: flex-end;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 100px;
    border-top-right-radius: 100px;
    border-top-left-radius: 100px;
`;

const MessageRightBody = styled(MessageBody)`
    background-color: #b04fc9;
    margin-left: auto;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 0px;
    margin-right: 10px;
`;
