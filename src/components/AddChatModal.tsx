import styled from "styled-components";
import { DarkColor } from "./ChatCard";
import { Column } from "../pages/AuthPage";
import { Input } from "./Input";
import { useState } from "react";

interface Props {
    status: "ok" | "failed" | "pending" | "none";
    closeModal: () => void;
    onAddClick: (username: string) => void;
}

export function AddChatModal(props: Props) {
    const { status, closeModal, onAddClick } = props;

    const [username, setUsername] = useState("");

    return (
        <ModalBackground
            onClick={() => {
                closeModal();
            }}
        >
            <Modal
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <Column>
                    <Paragraph centered={true}>
                        {status == "failed" ? "Wrong request" : ""}
                    </Paragraph>
                    <Paragraph centered={true}>Add chat</Paragraph>
                    <Input onValue={setUsername} value={username} />
                    <button onClick={() => onAddClick(username)}>Add</button>
                </Column>
            </Modal>
        </ModalBackground>
    );
}

const Paragraph = styled.p.attrs<{ centered?: boolean }>(props => props)`
    font-size: 1.2rem;
    ${props => (props.centered ? "text-align: center;" : "")}
`;

const Modal = styled.div`
    padding: 10px;
    border-radius: 10px;
    display: flex;
    background: ${DarkColor};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalBackground = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    flex: 1;
`;
