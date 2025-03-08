require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const VALID_CODE_DAN = process.env.VALID_CODE_DAN;
const VALID_CODE_QUE = process.env.VALID_CODE_QUE;
const VALID_CODE_ADMIN = process.env.VALID_CODE_ADMIN;

  const USERS = {
    [VALID_CODE_ADMIN]: "Administrador",
    [VALID_CODE_QUE]: "Quenia",
    [VALID_CODE_DAN]: "Daniel"
  };

const login = async (req, res) => {
  const { codigo } = req.body;
  const user = USERS[codigo]

  if (!user) {
    return res.status(401).json({ message: "Código inválido!" });
  }
  
  const token = jwt.sign({ user: 'Daniel' }, SECRET_KEY, { expiresIn: '1h' });
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 60 * 60 * 1000
  });

  console.log(`Login bem-sucedido para usuário: ${user}`);
  return res.status(200).json({ message: `Login de ${user} bem-sucedido!` })
};

const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  return res.json({ message: 'Logout realizado com sucesso!' });
};

module.exports = {
  login,
  logout
}
