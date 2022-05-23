import styled from 'styled-components';
import { Link, useLocation, } from 'react-router-dom';

export default function Success() {
    return (
        <Container>
            <Title>Pedido feito <br /> com sucesso!</Title>
        </Container>
    )
}

const Container = styled.div`
    width: 360px;
    margin: 95px auto;
`;

const Title = styled.p`
    width: 100%;
    margin: 36px auto 0 auto;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #247A6B;
    letter-spacing: 0.04cm;
`;