import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdPersonAddAlt } from 'react-icons/md';
import imgHomecell from '../../utils/logo.png';
import loading from '../../utils/loading.webp';
import useApi from '../../hooks/useApi';

import './stylesCli.css';

const Clientes = () => {
    const [valueSearch, setValueSearch] = useState('');
    const [clientesSearched, setClientesSearched] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [page, setPage] = useState(0);

    const loadingRef = useRef(null);

    useEffect(() => {
        fetchClientes();
    // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        if (!loadingRef.current) return;

        const intersectionObserver = new IntersectionObserver((entries) => {
            if(entries.some((entry) => entry.isIntersecting)) {
                setPage((p) => p + 10)
            }
        });
        
        intersectionObserver.observe(loadingRef.current);

        return () => intersectionObserver.disconnect();
    // eslint-disable-next-line
    }, [loadingRef.current])

    const fetchClientes = async () => {
        try {
            const response = await useApi.get(`/clientes/10/${page}`);
            setClientes([...clientes, ...response.data]);
        } catch (err) {
            console.log('Erro ao buscar clientes:', err);
        }
    };

    function formatCPF(cpf) {
        if (!cpf) return '';
        return cpf.replace(/[^\d]/g, "") // Tira os elementos indesejados
                  .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // Realiza a formatação
    };

    async function searchCliente() {
        try {
            const res = await useApi.get(`/clientes-search?value=${valueSearch}`)
            setClientesSearched(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log(err.response.data.message);
            setClientesSearched([]);
            setPage(0);
        }
    };

    function submit(e) {
        e.preventDefault();
        searchCliente();
        setValueSearch('');
    }

    return(
        <div className='container'>
            <div className='divLogo'>
                <Link to={'/'} onClick={() => window.location.reload()}>
                    <img className='logo' src={imgHomecell} alt='HOME CELL' />
                </Link>
            </div>

            <div className='container-clientes'>
                <h1>Clientes</h1>

                <div className='input-container'>
                    <div className='input-button'>
                        <input
                            type='text'
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                            name='valueSearch'
                            placeholder='Nome / CPF / ID'
                            autoComplete='off'
                        />
                        <Button onClick={submit}
                        rightIcon={<MdArrowForward/>}
                        variant='outline'
                        colorScheme='green'
                        aria-label='Pesquisar Clientes'>Pesquisar</Button>
                    </div>
                </div>

                <Link to={'/cadastrar-cliente'}>
                    <Button className='btnAdd' rightIcon={<MdPersonAddAlt/>} colorScheme='green' aria-label='Adicionar'>Adicionar</Button>
                </Link>
                <div className='labels'>
                    <h2 className='id'>ID</h2>
                    <h2 className='ncpf'>Nome/CPF</h2>
                    <h2 className='ap'>Aparelhos</h2>
                </div>

                <div className='lista-cliente'>

                    { clientesSearched.length > 0 ? clientesSearched.map(cliSearched => (
                        <Link to={`/clientes/${cliSearched.id}`} key={`search-${cliSearched.id}`}>
                            <div className='cli-inf'>
                                <div className='id'>
                                    <p>{cliSearched.id}</p>
                                </div>
                                <div className='nomeCpf'>
                                    <p>{cliSearched.nome}</p>
                                    <p>{cliSearched.cpf}</p>
                                </div>
                                <div className='aparelhos'>
                                    <p>{cliSearched.total_aparelhos}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                    : clientes.map(cliente => (
                        <Link to={`/clientes/${cliente.id}`} key={`cliente-${cliente.id}`} >
                            <div className='cli-inf'>
                                <div className='id'>
                                    <p>{cliente.id}</p>
                                </div>
                                <div className='nomeCpf'>
                                    <p>{cliente.nome}</p>
                                    <p>{formatCPF(cliente.cpf)}</p>
                                </div>
                                <div className='aparelhos'>
                                    <p>{cliente.total_aparelhos}</p>
                                </div>
                            </div>
                        </Link>
                    )) }

                    <div id="loading" ref={loadingRef}>
                        <img src={loading} alt='Loading'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Clientes;

