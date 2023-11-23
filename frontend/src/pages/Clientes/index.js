import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdOutlineMoreVert, MdPersonAddAlt } from 'react-icons/md';
import imgHomecell from '../../logo.png';
import useApi from '../../hooks/useApi';

import './stylesCli.css';

const Clientes = () => {
    const [valueSearch, setValueSearch] = useState('');
    const [clienteSearched, setClienteSearched] = useState();
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        useApi.get('/clientes')
            .then((resposta) => {
                setClientes(resposta.data);
            })
            .catch((err) => {
                console.log(err);
            })
    });

    const ListCli = clientes.map(cliente =>
        <Link to={`/clientes/${cliente.id}`} >
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

    async function searchCliente() {
        await useApi.get(`/clientes-search/${valueSearch}`)
            .then((res) => {
                const [result] = res.data;
                setClienteSearched(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function submit(e) {
        console.log(valueSearch)
        searchCliente();
        e.preventDefault();
        setValueSearch('');
        reset();
    }

    return(
        <div className='container'>
            <img className='logo' src={imgHomecell} alt='HOME CELL' />

            <div className='container-clientes'>
                <h1>Clientes</h1>

                <div className='input-container'>
                    <label className='label'>Pesquisar:</label>
                    <div className='input-button'>
                        <input
                            type='text'
                            value={valueSearch}
                            onChange={event => setValueSearch(event.target.value)}
                            name='valueSearch'
                            placeholder='Nome ou CPF'
                        />
                        <Button onClick={submit} rightIcon={<MdArrowForward/>} variant='outline' colorScheme='green'>Pesquisar</Button>
                    </div>
                </div>

                <Link to={'/cadastrar-cliente'}>
                    <Button className='btnAdd' rightIcon={<MdPersonAddAlt/>} colorScheme='green'>Adicionar</Button>
                </Link>
                <div className='labels'>
                    <h2 className='ncpf'>Nome/CPF</h2>
                    <h2 className='mod'>Modelo</h2>
                    <h2 className='pag'>Pago</h2>
                    <h2 className='pro'>Pronto</h2>
                </div>

                <div className='lista-cliente'>
                    { clienteSearched ?
                        <Link to={`/clientes/${clienteSearched.id}`} >
                            <div className='cli-inf' key={clienteSearched.id}>
                                <div>
                                    <p>{clienteSearched.nome}</p>
                                    <p>{clienteSearched.cpf}</p>
                                </div>
                                <div>
                                    <p>{clienteSearched.modelo}</p>
                                </div>
                                <div>
                                    <p>{clienteSearched.pago}</p>
                                </div>
                                <div>
                                    <p>{clienteSearched.status}</p>
                                </div>
                                <button onClick={() => console.log('abre options -delete-update')}><MdOutlineMoreVert/></button>
                            </div>
                        </Link>
                    : ListCli }
                </div>
            </div>
        </div>
    );
}

export default Clientes;



