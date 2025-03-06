require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const VALID_CODE_DAN = process.env.VALID_CODE_DAN;
const VALID_CODE_QUE = process.env.VALID_CODE_QUE;
const VALID_CODE_ADMIN = process.env.VALID_CODE_ADMIN;

const login = async (req, res) => {
  const { codigo } = req.body;
     
  if (codigo === VALID_CODE_ADMIN) {
    const token = jwt.sign({ user: 'Administrador' }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 60 * 1000
    });
    console.log('Login do Administrador bem-sucedido!' )
    return res.status(200).json({ message: 'Login do administrador bem-sucedido!' })
  } else if (codigo === VALID_CODE_QUE) {
    const token = jwt.sign({ user: 'Quenia' }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 60 * 1000
    });
    console.log('Login de Quenia bem-sucedido!')
    return res.status(200).json({ message: 'Login de quenia bem-sucedido!' })
  } else if (codigo === VALID_CODE_DAN) {
    const token = jwt.sign({ user: 'Daniel' }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 60 * 1000
    });
    console.log('Login de Daniel bem-sucedido!')
    return res.status(200).json({ message: 'Login de daniel bem-sucedido!' })
  } else {
    return res.status(401).json({ message: 'Código inválido!' });
  }
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
