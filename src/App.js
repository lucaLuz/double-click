import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/HomePage/HomePage';
import RecordsPage from './RecordsPage/RecordsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registros" element={<RecordsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
