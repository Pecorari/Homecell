import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';
import useApi from '../../hooks/useApi';
import imgHomecell from '../../utils/logo.png';

import './stylesLogin.css';

const Login = () => {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function submit() {
    try {
      const response = await useApi.post('/login', { codigo });
      localStorage.setItem('token', response.data.token);
      setError('');
      navigate('/clientes');
    } catch (err) {
      setError(err);
    }
  }

  return(
    <div className='container-login'>
      <div className='divLogo-login'>
        <img className='logo-login' src={imgHomecell} alt='HOME CELL' />
      </div>

      <div className='container-input-login'>
        <h1>Login</h1>

        <input
            onChange={(e) => setCodigo(e.target.value)}
            placeholder='Digite o código'
            autoComplete='off'
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className='inputLogin'
            type='password'
        />

        { error && <p id='error'>{error}</p> }

        <Button className='btnLogin' rightIcon={<MdArrowForward/>} colorScheme='green' onClick={submit}>Acessar</Button>
      </div>

      <footer className="footer-login">Desenvolvido por Thiago Pecorari Clemente</footer>
    </div>
  );
}

// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default Login;
