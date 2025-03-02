import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdWest } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import imgHomecell from '../../utils/logo.png';
import useApi from '../../hooks/useApi';
import useAuth from '../../utils/useAuth';

import './stylesCadCli.css';

const CadCli = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [numeroCell, setNumeroCell] = useState('');
    const [numeroRes, setNumeroRes] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [id, setId] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(id !== '') {
            navigate('/clientes/' + id);
        }
    }, [id, navigate]);

    async function submit() {
        const dados = { nome, cpf, numeroCell, numeroRes, endereco, cidade }
        
        try {
            const resposta = await useApi.post('/cadastrar-cliente', dados);
            setId(resposta.data);
            reset();
            setError('');
        } catch (err) {
            console.log(err.response.data.message)
            setError(err.response.data.message);
        }
    }

    function reset() {
        setNome('');
        setCpf('');
        setNumeroCell('');
        setNumeroRes('');
        setEndereco('');
        setCidade('');
    }

    const { loading } = useAuth();
    if(loading) return <p>CARREGANDO...</p>;

    return(
        <div className='container'>
            <div className='divLogo'>
                <Link to={'/clientes'}>
                    <img className='logo' src={imgHomecell} alt='HOME CELL' />
                </Link>
            </div>

            <div className='container-form'>
                <h1>Cadastrar Cliente</h1>

                <div className='input-container'>
                    <label className='label'>Nome Completo:</label>
                    <input
                        type='text'
                        value={nome}
                        onChange={event => setNome(event.target.value)}
                        name='nome'
                        placeholder='Nome do cliente'
                    />
                    <label className='label'>CPF:</label>
                    <InputMask
                        mask='999.999.999-99'
                        value={cpf}
                        onChange={event => setCpf(event.target.value)}
                        name='cpf'
                        placeholder='___.___.___-__'
                    />
                    <label className='label'>Numero do Celular:</label>
                    <InputMask
                        mask='(99) 99999-9999'
                        value={numeroCell}
                        onChange={event => setNumeroCell(event.target.value)}
                        name='numeroCelular'
                        placeholder='(__) _____-____'
                    />
                    <label className='label'>Numero Residencial:</label>
                    <InputMask
                        mask='(99) 9999-9999'
                        value={numeroRes}
                        onChange={event => setNumeroRes(event.target.value)}
                        name='numeroResidencial'
                        placeholder='(__) ____-____'
                    />
                    <label className='label'>Endereço:</label>
                    <input
                        type='text'
                        value={endereco}
                        onChange={event => setEndereco(event.target.value)}
                        name='endereco'
                        placeholder='Endereço do cliente'
                    />
                    <label className='label'>Cidade:</label>
                    <input
                        type='text'
                        value={cidade}
                        onChange={event => setCidade(event.target.value)}
                        name='cidade'
                        placeholder='Cidade do cliente'
                    />
                </div>

                { error && <p id='error'>{error}</p> }

                <div className='divButtons'>
                    <Link to={'/clientes'}>
                        <Button className='back' rightIcon={<MdWest/>} variant='outline' aria-label="Voltar">
                            Voltar
                        </Button>
                    </Link>

                    <Button
                        className='cadastrar'
                        rightIcon={<MdArrowForward/>}
                        onClick={submit}
                        colorScheme='green'
                        aria-label="Cadastrar Cliente"
                        marginLeft={{base: 10, sm: 50, md: 150}}>
                            Cadastrar
                    </Button>
                </div>
            </div>
        </div>
    );
}
// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default CadCli;
