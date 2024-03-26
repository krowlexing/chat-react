import styled from "styled-components";
import { UserData } from "../data/UserData";
import { DarkColor } from "./ChatCard";

interface Props {
    user: UserData;
}

export function ProfileView(props: Props) {
    const { user } = props;
    return (
        <ProfileContainer>
            <CenteredText>
                {user.username} / {user.id}
            </CenteredText>
        </ProfileContainer>
    );
}

const ProfileContainer = styled.div`
    background: ${DarkColor};
    width: 100%;
    height: 3rem;
    display: flex;
    font-size: 1.2rem;
    align-items: center;
`;

const CenteredText = styled.div`
    text-align: center;
    flex: 1;
`;
