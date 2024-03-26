import { Login } from "../components/Login";
import { Register } from "../components/Register";
import styled from "styled-components";

import { token } from "../network/network";
import { useNavigate } from "react-router";
import {
    actions,
    useAppDispatch,
    useAppSelector,
} from "../reducers/testChatReducer";
import { useEffect } from "react";

export function AuthPage() {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const me = useAppSelector(state => state.me.status);

    useEffect(() => {
        console.log("why&&");
        if (me === "ok") {
            navigate("./test/chats");
        }
    }, [me, navigate]);

    const onAuth = (jwtToken: string) => {
        token.update(jwtToken);
        dispatch(actions.requestMe());
    };
    return (
        <>
            <Container>
                <InnerContainer>
                    <Register onToken={onAuth} />
                </InnerContainer>
                <InnerContainer>
                    <Login onToken={onAuth} />
                </InnerContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
`;

const InnerContainer = styled.div`
    padding: 10px;
`;
