import styled from "styled-components";
import { ChatData } from "../reducers/reducer";

interface Props {
    chat: ChatData;
    onClick: (id: number) => void;
}

export function ChatCard(props: Props) {
    const { id, title, description } = props.chat;
    return (
        <>
            <div onClick={() => props.onClick(id)}>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </div>
        </>
    );
}

export const DarkColor = "#000010";

const Title = styled.div`
    background: #2d2d2d;
    padding: 5px;
    margin: 5px;
    border-radius: 10px;
    max-width: 300px;
    min-width: 150px;
    font-size: 2rem;
    text-align: left;
    text-indent: 1rem;
`;

const Description = styled.div`
    background: red;
    font-size: 10rem;
`;
