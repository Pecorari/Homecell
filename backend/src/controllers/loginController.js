require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'minha_chave_super_secreta';
const VALID_CODE = '553642';

const login = async (req, res) => {
  const { codigo } = req.body;
    
  if (codigo === VALID_CODE) {
    const token = jwt.sign({ user: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Código inválido!' });
  }
};

module.exports = {
  login
}
