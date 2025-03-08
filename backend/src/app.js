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
  origin: '*',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  preflightContinue: false
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(router);

module.exports = app;
