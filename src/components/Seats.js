import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Seats() {
    const [ seats, setSeats ] = useState([]);
    const [ session, setSession ] = useState({});
    const [ selectedSeatsId, setSelectedSeatsId ] = useState([]);
    const [ selectedSeatsNumber, setSelectedSeatsNumber ] = useState([]);
    const [ name, setName ] = useState([]);
    const [ cpf, setCpf ] = useState([]);

    const { sessionId } = useParams();

    let navigate = useNavigate();

    function placeOrder() {
        const regex = /^\d{11}$/;
        if(cpf.match(regex) && name !== "" && selectedSeatsId.length !== 0) {
            const order = {
                ids: selectedSeatsId,
                name: name,
                cpf: cpf
            };
            axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', order);
            navigate("/sucesso", {state:{completedOrder: {
                ...order,
                number: selectedSeatsNumber,
                title: session.title,
                weekday: session.weekday,
                time: session.time
            }}});
        } else {
            alert("Preencha corretamente os campos");
        }
    }

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);
        request.then((response) => {
            console.log(response.data);
            setSeats(response.data.seats);
            setSession({
                title: response.data.movie.title,
                poster: response.data.movie.posterURL,
                weekday: response.data.day.weekday,
                time: response.data.name
            });
        })
    }, []);

    return(
        <>
        <Container>
            <Command> Selecione o(s) assento(s) </Command>
            <SeatsList>
                {seats.map((seat) => <Seat
                key={seat.id}
                id={seat.id}
                number={seat.name}
                availability={seat.isAvailable}
                selectedSeatsId={selectedSeatsId}
                setSelectedSeatsId={setSelectedSeatsId}
                selectedSeatsNumber={selectedSeatsNumber}
                setSelectedSeatsNumber={setSelectedSeatsNumber} />)}
            </SeatsList>
            <Caption />
            <ViewerBox>
                <ViewerCredentials
                setName={setName}
                setCpf={setCpf} />
            </ViewerBox>
            <FinishOrderButton onClick={placeOrder}>Reservar assento(s)</FinishOrderButton>
        </Container>
        <PageFooter
        poster={session.poster}
        title={session.title}
        weekday={session.weekday}
        time={session.time} />
        </>
    )
}

function Seat({ id, number, availability, selectedSeatsId, setSelectedSeatsId, selectedSeatsNumber, setSelectedSeatsNumber }) {
    const [ selected, setSelected ] = useState(false);

    function selectSeat(id, n) {
        const seatsArrayId = selectedSeatsId;
        const seatsArrayNumber = selectedSeatsNumber;
        if (seatsArrayId.includes(id)) {
            setSelectedSeatsId(seatsArrayId.filter((seat) => seat !== id));
            setSelectedSeatsNumber(seatsArrayNumber.filter((seat) => seat !== number));
            setSelected(false);
        } else {
            seatsArrayId.push(id);
            seatsArrayNumber.push(n);
            setSelected(true);
            setSelectedSeatsId(seatsArrayId);
            setSelectedSeatsNumber(seatsArrayNumber);
        }
    }

    if(availability) {
        if(!selected) {
            return (
                <SeatBall color={'#C3CFD9'} border={'#7B8B99'} cursor={'pointer'} onClick={() => selectSeat(id, number)}>
                    {number}
                </SeatBall>
            )
        } else {
            return (
                <SeatBall color={'#8DD7CF'} border={'#45BDB0'} cursor={'pointer'} onClick={() => selectSeat(id, number)}>
                    {number}
                </SeatBall>
            )
        }
    } else {
        return (
            <SeatBall color={'#FBE192'} border={'#F7C52B'} cursor={'default'}>
                {number}
            </SeatBall>
        )
    }
}

function Caption() {
    return (
        <CaptionBox>
            <CaptionElement>
                <CaptionBall color={'#8DD7CF'} border={'#45BDB0'}></CaptionBall>
                <p> Selecionado </p>
            </CaptionElement>
            <CaptionElement>
                <CaptionBall color={'#C3CFD9'} border={'#7B8B99'}></CaptionBall>
                <p> Disponível </p>
            </CaptionElement>
            <CaptionElement>
                <CaptionBall color={'#FBE192'} border={'#F7C52B'}></CaptionBall>
                <p> Indisponível </p>
            </CaptionElement>
        </CaptionBox>
    )
}

function ViewerCredentials({ setName, setCpf }) {
    return (
        <>
            <p>Nome do comprador:</p>
            <Input onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome..." />
            <p>CPF do comprador:</p>
            <Input onChange={(e) => setCpf(e.target.value)} placeholder="Digite seu CPF..." />
        </>
    )
}

function PageFooter({ poster, title, weekday, time }) {
    return (
        <Footer>
            <FooterContent>
                <MovieContainer>
                    <img src={poster} />
                </MovieContainer>
                <MovieTitle>{title} <br /> {weekday} - {time}</MovieTitle>
            </FooterContent>
        </Footer>
    )
}

const Container = styled.div`
    width: 360px;
    margin: 95px auto 147px auto;
`;

const Command = styled.p`
    width: 100%;
    margin: 36px auto 0 auto;
    font-size: 24px;
    text-align: center;
    color: #293845;
    letter-spacing: 0.04cm;
`;

const SeatsList = styled.div`
    width: 327px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const SeatBall = styled.div`
    width: 26px;
    height: 26px;
    margin: 9px 5px 9px 0;
    background-color: ${props => props.color};
    border: 1px solid ${props => props.border};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    cursor: ${props => props.cursor};

    &:nth-of-type(10n) {
        margin-right: 0;
    }
`;

const CaptionBox = styled.div`
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const CaptionElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
        font-size: 13px;
        text-align: center;
        color: #4E5A65;
        margin: 10px 0; 
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 15px 0;
    height: 51px;
    background-color: #FFFFFF;
    border: 1px solid #D4D4D4;

    &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-style: italic;
        font-size: 18px;
        color: #AFAFAF;
    }
`;

const CaptionBall = styled.div`
    width: 26px;
    height: 26px;
    margin: 0 auto 5px auto;
    background-color: ${props => props.color};
    border: 1px solid ${props => props.border};
    border-radius: 50%;
`;

const ViewerBox = styled.div`
    width: 100%;

    p {
        font-size: 18px;
        color: #293845;
    }
`;

const FinishOrderButton = styled.button`
    width: 225px;
    height: 42px;
    margin: 10px auto 0 auto;
    background-color: #E8833A;
    border: 0px solid transparent;
    border-radius: 3px;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0.04cm;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Footer = styled.footer`
    width: 100%;
    height: 117px;
    background-color: #DFE6ED;
    position: fixed;
    border-top: 1px solid #9EADBA;
    bottom: 0;
    z-index: 1;
`;

const FooterContent = styled.div`
    width: 360px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const MovieContainer = styled.div`
    width: 64px;
    height: 89px;
    margin: 10px 0;
    background: #FFFFFF;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
        width: 48px;
        height: 72px;
        object-fit: cover;
    }
`;

const MovieTitle = styled.h1`
    margin-left: 10px;
    font-size: 22px;
    line-height: 1.2;
    color: #293845;
`