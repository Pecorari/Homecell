import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clientes from '../../data/clientes';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdOutlineMoreVert, MdPersonAddAlt } from 'react-icons/md';
import imgHomecell from '../../logo.png';

import './stylesCli.css';

const Clientes = () => {
    const [nomeSearch, setNomeSearch] = useState('');
    const [cpfSearch, setCpfSearch] = useState('');
    const [search, setSearch] = useState('Nome');

    const ListCli = clientes.map(cliente =>
        <Link to={'/perfil'}>
            <div className='cli-inf' key={cliente.id}>
                <div>
                    <p>{cliente.nome}</p>
                    <p>{cliente.cpf}</p>
                </div>
                <div>
                    <p>{cliente.modelo}</p>
                </div>
                <div>
                    <p>{cliente.pago}</p>
                </div>
                <div>
                    <p>{cliente.status}</p>
                </div>
                <button onClick={() => console.log('abre options -delete-update')}><MdOutlineMoreVert/></button>
            </div>
        </Link>
    )

    function reset() {
        Array.from(document.querySelectorAll('input')).forEach(input => {
            input.value = ('');
        });;
    }

    function submit(e) {
        e.preventDefault();
        setCpfSearch('')
        setNomeSearch('')
        console.log(nomeSearch, cpfSearch);
        reset();
    }

    return(
        <div className='container'>
            <img className='logo' src={imgHomecell} alt='HOME CELL' />

            <div className='container-clientes'>
                <h1>Clientes</h1>

                <div className='input-container'>
                    <label className='label'>Pesquisar pelo {search}:</label>
                    <div className='input-button'>
                        {search === 'Nome'
                        ? <input
                            type='text'
                            value={nomeSearch}
                            onChange={event => setNomeSearch(event.target.value)}
                            name='nomeSearch'
                            label='Pesquisar pelo nome'
                            placeholder='Thiago Pecorari Clemente'
                            />
                        : <input
                            type='text'
                            value={cpfSearch}
                            onChange={event => setCpfSearch(event.target.value)}
                            name='cpfSearch'
                            label='Pesquisar pelo cpf'
                            placeholder='xxx.xxx.xxx-xx'
                            />
                        }
                        <select onChange={(e) => setSearch(e.target.value)}>
                            <option value='Nome'>Nome</option>
                            <option value='CPF'>CPF</option>
                        </select>
                        <Button onClick={submit} rightIcon={<MdArrowForward/>} variant='outline' colorScheme='green'>Pesquisar</Button>
                    </div>
                </div>

                <Link to={'/cadastrar-cliente'}>
                    <Button className='btnAdd' rightIcon={<MdPersonAddAlt/>} onClick={() => console.log('Adicionar um cliente novo')} colorScheme='green'>Adicionar</Button>
                </Link>
                <div className='labels'>
                    <h2 className='ncpf'>Nome/CPF</h2>
                    <h2 className='mod'>Modelo</h2>
                    <h2 className='pag'>Pago</h2>
                    <h2 className='pro'>Pronto</h2>
                </div>

                <div className='lista-cliente'>
                    {ListCli}
                </div>
            </div>
        </div>
    );
}

export default Clientes;



