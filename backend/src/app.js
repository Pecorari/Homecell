const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use(express.json());
app.use(cors());
app.use(router);

module.exports = app;
