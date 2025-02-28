require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'Token não fornecido!' });

  if (!token.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Token mal formatado!' });
  }

  const tokenWithoutBearer = token.split(' ')[1];

  jwt.verify(tokenWithoutBearer, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido!' });

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
