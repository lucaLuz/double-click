import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'

function HomePage() {
  const [clickTime, setClickTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);

  const handleClick = () => {
    if (!clickTime) {
      setClickTime(Date.now());
    } else {
      const difference = Date.now() - clickTime;
      setTimeDifference(difference);
      axios.post('http://localhost:3000/click', { time: difference, timestamp: new Date() })
      setClickTime(null);
    }
  };

  return (
    <div className='parent'>
    <div className='container'>
      <h1>Vamos iniciar a contagem</h1>
      <div className='exibir' >
      <button className='btn btnr' onClick={handleClick}>Clique Aqui</button>
      {timeDifference && <p>Tempo entre cliques: {timeDifference} ms</p>}
      </div>
      <Link className='link' to="/registros">Ver Registros</Link>
    </div>
    </div>
  );
}

export default HomePage;
