const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors()); 

app.use(express.json());

app.post('/click', (req, res) => {
  const data = req.body;
  try {
    fs.appendFileSync('registros.json', JSON.stringify(data) + '\n');
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/registros', (req, res) => {
  try {
    const registros = fs.readFileSync('registros.json', 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
    res.json(registros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
