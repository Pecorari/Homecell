import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdWest } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import imgHomecell from '../../logo.png';
import useApi from '../../hooks/useApi';

import './stylesCadCli.css';

const CadCli = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [numeroCell, setNumeroCell] = useState('');
    const [numeroRes, setNumeroRes] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(id !== '') {
            navigate('/clientes/' + id);
        }
    });
    
    async function addCli(dados) {
        await useApi.post('/cadastrar-cliente', dados)
        .then((resposta) => {
            setId(resposta.data);
        })
        .catch((err) => console.log(err));
    }

    function submit() {
        const dados = {
            nome,
            cpf,
            numeroCell,
            numeroRes,
            endereco,
            cidade
        }

        addCli(dados);
        reset();
    }

    function reset() {
        Array.from(document.querySelectorAll('input')).forEach(input => {
            input.value = ('');
        });
    }

    return(
        <div className='container'>
            <img className='logo' src={imgHomecell} alt='HOME CELL' />

            <div className='divs'>
                <div className='container-form'>
                    <h1>Cadastrar Cliente</h1>

                    <div className='input-container'>
                        <label className='label'>Nome Completo:</label>
                        <input
                            type='text'
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                            name='nome'
                            placeholder='Thiago Pecorari Clemente'
                        />
                        <label className='label'>CPF:</label>
                        <input
                            type='text'
                            value={cpf}
                            onChange={event => setCpf(event.target.value)}
                            name='cpf'
                            placeholder='xxx.xxx.xxx.xx'
                        />
                        <label className='label'>Numero do Celular:</label>
                        <input
                            type='text'
                            value={numeroCell}
                            onChange={event => setNumeroCell(event.target.value)}
                            name='numeroCelular'
                            placeholder='(xx) xxxxx-xxxx'
                        />
                        <label className='label'>Numero Residencial:</label>
                        <input
                            type='text'
                            value={numeroRes}
                            onChange={event => setNumeroRes(event.target.value)}
                            name='numeroResidencial'
                            placeholder='(xx) xxxxx-xxxxx'
                        />
                        <label className='label'>Endereço:</label>
                        <input
                            type='text'
                            value={endereco}
                            onChange={event => setEndereco(event.target.value)}
                            name='endereco'
                            placeholder='Rua Curitiba 1317, Cidade Nova'
                        />
                        <label className='label'>Cidade:</label>
                        <input
                            type='text'
                            value={cidade}
                            onChange={event => setCidade(event.target.value)}
                            name='cidade'
                            placeholder='Santa Barbara do Oeste'
                        />
                    </div>

                    <Link to={'/'}>
                        <Button rightIcon={<MdWest/>} variant='outline'>
                            Voltar
                        </Button>
                    </Link>

                    <Button
                        rightIcon={<MdArrowForward/>}
                        onClick={submit}
                        colorScheme='green'
                        width={300}
                        marginLeft={150}>
                            Cadastrar
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default CadCli;
