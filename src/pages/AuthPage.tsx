import { Login } from "../components/Login";
import { Register } from "../components/Register";
import styled from "styled-components";

import { useNavigate } from "react-router";
import { actions, useAppDispatch, useAppSelector } from "../reducers/reducer";
import { useEffect } from "react";

export function AuthPage() {
    const navigate = useNavigate();

    const me = useAppSelector(state => state.me.status);
    const login = useAppSelector(state => state.login.status);
    const register = useAppSelector(state => state.login.status);

    const authError =
        login !== "pending" &&
        register !== "pending" &&
        (login === "failed" || register === "failed");

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (me === "ok") {
            navigate("./app");
        }
    }, [me, navigate]);

    return (
        <>
            <Centered>
                <Column>
                    <Centered>
                        {authError ? "Ошибка аутентификации" : ""}
                    </Centered>
                    <Row>
                        <InnerContainer>
                            <Register
                                onRegisterClick={(username, password) => {
                                    dispatch(
                                        actions.requestRegister(
                                            username,
                                            password,
                                        ),
                                    );
                                }}
                            />
                        </InnerContainer>
                        <InnerContainer>
                            <Login
                                onLoginClick={(username, password) => {
                                    dispatch(
                                        actions.requestLogin(
                                            username,
                                            password,
                                        ),
                                    );
                                }}
                            />
                        </InnerContainer>
                    </Row>
                </Column>
            </Centered>
        </>
    );
}

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const Centered = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Row = styled.div`
    display: flex;
`;

const InnerContainer = styled.div`
    padding: 10px;
`;
