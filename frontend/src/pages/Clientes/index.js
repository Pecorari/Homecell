import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdPersonAddAlt } from 'react-icons/md';
import imgHomecell from '../../utils/logo.png';
import loading from '../../utils/loading.webp';
import useApi from '../../hooks/useApi';

import './stylesCli.css';

const Clientes = () => {
    const [valueSearch, setValueSearch] = useState('');
    const [clienteSearched, setClienteSearched] = useState();
    const [clientes, setClientes] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchClientes();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if(entries.some((entry) => entry.isIntersecting)) {
                setPage((p) => p + 10)
            }
        });
        intersectionObserver.observe(document.querySelector('#loading'));
        return () => intersectionObserver.disconnect();
    // eslint-disable-next-line
    }, [])

    const fetchClientes = async () => {
        const response = await useApi.get(`/clientes/10/${page}`);
        setClientes([...clientes, ...response.data]);
    };

    const ListCli = clientes.map(cliente =>
        <Link to={`/clientes/${cliente.id}`} >
            <div className='cli-inf' key={cliente.id}>
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
    )

    function formatCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ""); // Tira os elementos indesejados
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // Realiza a formatação
    };

    const handleInputChange = (e) => {
        const searchValue = e.target.value
        setValueSearch(searchValue);
        
        searchCliente();
    }

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
    };
    

    function submit(e) {
        searchCliente();
        e.preventDefault();
        setValueSearch('');
        reset();
    }

    return(
        <div className='container'>
            <div className='divLogo'>
                <img className='logo' src={imgHomecell} alt='HOME CELL' />
            </div>

            <div className='container-clientes'>
                <h1>Clientes</h1>

                <div className='input-container'>
                    <div className='input-button'>
                        <input
                            type='text'
                            value={valueSearch}
                            onChange={handleInputChange}
                            name='valueSearch'
                            placeholder='Nome / CPF / ID'
                        />
                        <Button onClick={submit} rightIcon={<MdArrowForward/>} variant='outline' colorScheme='green'>Pesquisar</Button>
                    </div>
                </div>

                <Link to={'/cadastrar-cliente'}>
                    <Button className='btnAdd' rightIcon={<MdPersonAddAlt/>} colorScheme='green'>Adicionar</Button>
                </Link>
                <div className='labels'>
                    <h2 className='id'>ID</h2>
                    <h2 className='ncpf'>Nome/CPF</h2>
                    <h2 className='ap'>Aparelhos</h2>
                </div>

                <div className='lista-cliente'>
                    { clienteSearched ?
                        <Link to={`/clientes/${clienteSearched.id}`} >
                            <div className='cli-inf' key={clienteSearched.id}>
                                <div className='id'>
                                    <p>{clienteSearched.id}</p>
                                </div>
                                <div className='nomeCpf'>
                                    <p>{clienteSearched.nome}</p>
                                    <p>{clienteSearched.cpf}</p>
                                </div>
                                <div className='aparelhos'>
                                    <p>{clienteSearched.total_aparelhos}</p>
                                </div>
                            </div>
                        </Link>
                    : ListCli }
                    <div id="loading"><img src={loading} alt='Loading'/></div>
                </div>
            </div>
        </div>
    );
}

export default Clientes;


