import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RecordsPage.css'

function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    axios.get('http://localhost:3000/registros').then(response => {
      setRecords(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setRecords(records.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.time - b.time;
      } else {
        return b.time - a.time;
      }
    }));
  };

  const handleFilterClick = () => {
    axios.get('http://localhost:3000/registros').then(response => {
      const filteredRecords = response.data.filter(record => {
        const recordDate = new Date(record.timestamp).toISOString().split('T')[0];
        return recordDate === filter;
      });
      setRecords(filteredRecords);
    });
  };

  return (
    <div className='parent'>
    <div className='container'>
      <div className='centro'>
      <Link className='btnr' to="/">Voltar</Link>
      <div className='filtros'>
      <input className="input" type="date" value={filter} onChange={handleFilterChange} />
      <button className='btn' onClick={handleFilterClick}>Filtrar</button>
      <select className="select" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Menor para o maior</option>
        <option value="desc">Maior para o menor</option>
      </select>
      </div>
      {records.map((record, index) => (
        <p key={index}>{record.time} - {new Date(record.timestamp).toLocaleString()}</p>
      ))}
      </div>
    </div>
    </div>
  );
}

export default RecordsPage;
