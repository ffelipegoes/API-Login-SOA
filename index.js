//inicialização do server
const express = require('express');
const app = express();
const helmet = require('helmet');

//conexão DB
const conn = require('./db/conn');

//declaração de rota da api
const routes = require('./routes/routes');

//Utilização das variaveis de ambiente no server
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 3000;

//utilização da Lib
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/auth', routes);

//Conexão e sincronização com o DB
conn
  .sync()
  .then(() => {
    //Servidor escutando uma porta
    app.listen(port, () =>
      console.log(`Servidor Iniciado em http://localhost:${port}`),
    );
  })
  .catch((err) => console.error(err));
