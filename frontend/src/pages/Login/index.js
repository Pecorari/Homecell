import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdArrowBackIosNew } from 'react-icons/md';
import useApi from '../../hooks/useApi';
import imgHomecell from '../../utils/logo.png';

import './stylesLogin.css';

const Login = () => {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function submit() {
    if (!codigo) return setError('Campo vazio!');
    
    try {
      const response = await useApi.post('/login', { codigo });
      setError('');
      navigate('/clientes');
      console.log(response.data.message);
    } catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
  }

  return(
    <div className='container-login'>
      <Button className='back' leftIcon={<MdArrowBackIosNew/>} variant='outline' colorScheme='green' onClick={() => navigate('/')}>Voltar</Button>

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

      <footer className="footer-login">Desenvolvido por <a target='_blank' rel="noopener noreferrer" href='https://github.com/Pecorari'>Thiago Pecorari Clemente</a></footer>
    </div>
  );
}

// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default Login;
