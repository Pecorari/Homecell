import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdPersonAddAlt } from 'react-icons/md';
import imgHomecell from '../../utils/logo.png';
import loadingImg from '../../utils/loadingImg.webp';
import useAuth from '../../utils/useAuth';
import useApi from '../../hooks/useApi';

import './stylesCli.css';

const Clientes = () => {
    const [valueSearch, setValueSearch] = useState('');
    const [clientesSearched, setClientesSearched] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [page, setPage] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    const loadingRef = useRef(null);

    const fetchClientes = useCallback(async () => {
        if (isSearching) return;

        try {
            const response = await useApi.get(`/clientes/20/${page}`, { withCredentials: true });
            setClientes((prevClientes) => {
                const newClientes = response.data.filter(cliente => 
                    !prevClientes.some(prev => prev.id === cliente.id)
                )
                return [...prevClientes, ...newClientes]});
        } catch (err) {
            console.log('Erro ao buscar clientes:', err);
        }
    }, [page, isSearching]);

    useEffect(() => {
        if (!isSearching) {
            fetchClientes();
        }
// eslint-disable-next-line
    }, [page, isSearching]);

useEffect(() => {
    if (!loadingRef.current) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
        if(entries.some((entry) => entry.isIntersecting)) {
            setPage((p) => p + 10);
        }
    });
    intersectionObserver.observe(loadingRef.current);

    return () => intersectionObserver.disconnect();
// eslint-disable-next-line
}, [loadingRef.current]);

    function formatCPF(cpf) {
        if (!cpf) return '';
        return cpf.replace(/[^\d]/g, "").padStart(11, '0')
                  .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    async function searchCliente() {
        try {
            if (valueSearch === '') {
                setIsSearching(false);
                setClientesSearched([]);
                setPage(0);
                fetchClientes();
                return;
            }

            setIsSearching(true);
            setClientes([]);
            setPage(0);

            if (valueSearch.length === 11 && parseInt(valueSearch)) {
                const res = await useApi.get(`/clientes-search?value=${formatCPF(valueSearch)}`, { withCredentials: true });

                if (Array.isArray(res.data) && res.data.length > 0) {
                    setClientesSearched(res.data);
                } else setClientesSearched([])
                return;
            } else {
                const res = await useApi.get(`/clientes-search?value=${valueSearch}`, { withCredentials: true });

                if (Array.isArray(res.data) && res.data.length > 0) {
                    setClientesSearched(res.data);
                } else setClientesSearched([])
            }
        } catch (err) {
            console.log(err.response.data.message);
            setClientesSearched([]);
        }
    };

    function submit(e) {
        e.preventDefault();
        searchCliente();
    }

    async function logout() {
        const response = await useApi.post('/logout', { withCredentials: true });
        window.location.href = '/login';
        console.log(response.data.message);
    }

    const { loading, user } = useAuth();
    if(loading) return <p>CARREGANDO...</p>

    return(
        <div className='containerCli'>
            <div className='divLogo'>
                <Link to={'/clientes'} onClick={() => {
                    setClientesSearched([]);
                    setPage(0);
                    setIsSearching(false);
                    setValueSearch('');
                }}>
                    <img className='logo' src={imgHomecell} alt='HOME CELL' />
                </Link>
            </div>
            
            <div className='divUser'>
                <p>Olá, {user}</p>
                <Button onClick={logout} variant='outline' colorScheme='red' className='logout'>Sair</Button>
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
                            onKeyDown={(e) => e.key === 'Enter' && submit(e)}
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

                    {(clientes.length > 0 || clientesSearched.length > 0) && (
                        <div id="loadingImg" ref={loadingRef}>
                            <img src={loadingImg} alt='Loading-image'/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default Clientes;

