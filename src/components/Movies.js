import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const request = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');

        request.then((response) => {
            console.log(response.data);
            setMovies(response.data);
        })
    }, []);

    return (
        <Container>
            <Par> Selecione o filme </Par>
                {movies.map((movie) => <Movie key={movie.id} image={movie.posterURL} movieId={movie.id} />)}    
        </Container>
    )
}

function Movie({ image, movieId }) {
    return (
        <Link to={`/filme/${movieId}`}>
            <MovieContainer>
                <Image src={image} />
            </MovieContainer>
        </Link>
    )
}

const Container = styled.div`
    width: 375px;
    margin: 65px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;

const Par = styled.p`
    width: 100%;
    margin: 36px 0;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    text-align: center;
    color: #293845;
    letter-spacing: 0.04cm;
`;

const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    margin: 10px auto;
    background: #FFFFFF;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Image = styled.img`
    width: 129px;
    height: 193px;
    object-fit: cover;
`