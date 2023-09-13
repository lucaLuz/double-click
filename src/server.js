const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors()); 

app.use(express.json());

app.post('/click', (req, res) => {
  const data = req.body;
  fs.appendFileSync('registros.json', JSON.stringify(data) + '\n');
  res.json(data);
});

app.get('/registros', (req, res) => {
  const registros = fs.readFileSync('registros.json', 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
  res.json(registros);
});

app.listen(3000, () => console.log('Server running on port 3000'));
