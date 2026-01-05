require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const VALID_CODE_DAN = process.env.VALID_CODE_DAN;
const VALID_CODE_QUE = process.env.VALID_CODE_QUE;
const VALID_CODE_ADMIN = process.env.VALID_CODE_ADMIN;

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: '.homecellofficial.com.br',
  path: '/',
  maxAge: 60 * 60 * 1000
};

const login = async (req, res) => {
  const { codigo } = req.body;

  let user = null;

  if (codigo === VALID_CODE_ADMIN) user = 'Administrador';
  else if (codigo === VALID_CODE_QUE) user = 'Quenia';
  else if (codigo === VALID_CODE_DAN) user = 'Daniel';

  if (!user) {
    return res.status(401).json({ message: 'Código inválido!' });
  }

  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });

  res.cookie('token', token, cookieOptions);

  console.log(`Login de ${user} bem-sucedido!`);
  return res.status(200).json({ message: `Login de ${user} bem-sucedido!` });
};

const logout = async (req, res) => {
  res.clearCookie('token', {
    ...cookieOptions,
    maxAge: undefined
  });
  
  return res.json({ message: 'Logout realizado com sucesso!' });
};

module.exports = {
  login,
  logout
}
