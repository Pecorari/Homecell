const express = require('express');
const cors = require('cors');
const router = require('./router');
const cookieParser = require('cookie-parser');

const app = express();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(router);

module.exports = app;
