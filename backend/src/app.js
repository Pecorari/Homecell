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
  origin: 'https://homecellofficial.com.br/static/js/',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type',
  preflightContinue: false
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(router);

module.exports = app;
