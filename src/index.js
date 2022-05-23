import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './assets/reset.css';

import Header from './components/Header.js';
import Movies from './components/Movies.js';
import Sessions from './components/Sessions.js';
import Seats from './components/Seats.js';
import Success from './components/Success.js';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/filme/:movieId" element={<Sessions />} />
                <Route path="/sessao/:sessionId" element={<Seats />} />
                <Route path="/sucesso" element={<Success />} />
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));  