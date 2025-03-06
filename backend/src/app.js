const express = require('express');
const cors = require('cors');
const router = require('./router');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use(express.json());

const corsOptions = {
  origin: 'https://homecellofficial.com.br',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS'
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://homecellofficial.com.br');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(cookieParser());

app.use(router);

module.exports = app;
