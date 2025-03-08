require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(403).json({ message: 'Token não fornecido!' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido!' });

    
    console.log(`Verificação de ${decoded.user} feita com sucesso.`);
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
