const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8083;

app.use(express.static(__dirname + '/dist/controleLivros'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/controleLivros/index.html');
});

app.listen(PORT, () => {
  console.log('Servidor iniciado na porta' + PORT);
})



