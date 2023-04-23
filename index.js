const express = require('express');
const app = express();
const helmet = require('helmet');

const conn = require('./db/conn');
const routes = require('./routes/routes');

require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/auth', routes);

conn
  .sync()
  .then(() => {
    app.listen(port, () =>
      console.log(`Servidor Iniciado em http://localhost:${port}`),
    );
  })
  .catch((err) => console.error(err));
