import styled from 'styled-components';

export default function Header() {
    return (
        <HeaderContainer>
            <Title>CINEFLEX</Title>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 67px;
    background-color: #C3CFD9;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
`;

const Title = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    color: #E8833A;
`;