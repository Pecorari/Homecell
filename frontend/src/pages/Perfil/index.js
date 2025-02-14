import React from 'react';
import { useState, useEffect } from 'react';
import { MdArrowForward, MdAdd, MdWest } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import imgHomecell from '../../utils/logo.png';
import Modal from 'react-modal';
import useApi from '../../hooks/useApi';

import './stylesPer.css';

Modal.setAppElement('#root');

const Perfil = () => {
    const [cliente, setCliente] = useState({});
    const [aparelhos, setAparelhos] = useState([]);

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [numeroCell, setNumeroCell] = useState('');
    const [numeroRes, setNumeroRes] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');

    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [pago, setPago] = useState(false);
    const [situacao, setSituacao] = useState('Na fila');

    const [modalIsOpenApAdd, setModalIsOpenApAdd] = useState(false);
    const [modalIsOpenApPerfil, setModalIsOpenApPerfil] = useState(false);
    const [modalIsOpenApEdit, setModalIsOpenApEdit] = useState(false);
    const [modalIsOpenCliEdit, setModalIsOpenCliEdit] = useState(false);

    const [idAp, setIdAp] = useState('');
    const [aparelho, setAparelho] = useState({});

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {    
        useApi.get(`/clientes/${id}`)
            .then((res) => {
                const [dataCli] = res.data
                setCliente(dataCli);
            })
            .catch((err) => console.log(err))

        useApi.get(`cliente-aparelhos/${id}`)
            .then((res) => {
                setAparelhos(res.data);
            })
            .catch((err) => console.log(err))
        
        if (idAp !== '') getUniqueAp();
    });

    const ListAp = aparelhos.map(aparelho =>
        <Link onClick={() => {
            setIdAp(aparelho.id);
            getUniqueAp();
            setModalIsOpenApPerfil(true);
        }}>
            <div className='cell-inf' key={aparelho.id}>
                <div>
                    <p className='cellCreateAt'>{aparelho.created_at}</p>
                    <p>{aparelho.modelo}</p>
                </div>
                <div className='cellDesc'>
                    <p>{aparelho.descricao}</p>
                </div>
                <div className='cellVal'>
                    <p>{aparelho.valor}</p>
                </div>
                <div className='cellPagSit'>
                    <p>{aparelho.pago}</p>
                    <p>{aparelho.situacao}</p>
                </div>
            </div>
        </Link>
    )

    async function editCliente() {
        const dadosCli = {
            nome,
            cpf,
            numeroCell,
            numeroRes,
            endereco,
            cidade
        }

        await useApi.put(`/editar-cliente/${id}`, dadosCli)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        
        setModalIsOpenCliEdit(false);
    };

    async function delCliente() {
        await useApi.delete(`/apagar-cliente/${id}`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
    };

    async function getUniqueAp() {
        await useApi.get(`/cliente-aparelhos/${id}/${idAp}`)
            .then((res) => {
                const [result] = res.data;
                setAparelho(result);
            })
            .catch((err) => console.log(err))
    };
        
    async function addAparelho() {
        const dadosCell = {
            modelo,
            descricao,
            valor,
            pago,
            situacao
        }

        await useApi.post(`/cadastrar-aparelhos/${id}`, dadosCell)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))

        reset();
        setModalIsOpenApAdd(false);
    }

    async function delAparelho() {
        await useApi.delete(`apagar-aparelhos/${idAp}`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        
            reset();
    };

    async function editAparelho() {
        const dadosCellEdit = {
            modelo,
            descricao,
            valor,
            pago,
            situacao
        }

        await useApi.put(`/editar-aparelhos/${idAp}`, dadosCellEdit)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        
        reset();
        setModalIsOpenApEdit(false);
    }

    function reset() {
        setModelo('');
        setDescricao('');
        setValor('');
        setSituacao('Na fila');
        setPago(false);
    }

    return(
        <div className='container'>
            <div className='divLogo'>
                <img className='logo' src={imgHomecell} alt='HOME CELL' />
            </div>

            <div className='divs'>
                <div className='container-perfil'>
                    <div className='top'>
                        <Link to={'/'}>
                            <MdWest className='icon'/>
                        </Link>
                        <h1>Perfil</h1>
                    </div>

                    <div className='perfil'>
                        <label>Nome:</label>
                        <p>{cliente.nome}</p>
                        <label>CPF:</label>
                        <p>{cliente.cpf}</p>
                        <label>Número do Celular:</label>
                        <p>{cliente.numeroCell}</p>
                        <label>Número Residencial:</label>
                        <p>{cliente.numeroRes}</p>
                        <label>Endereço:</label>
                        <p>{cliente.endereco}</p>
                        <label>Cidade:</label>
                        <p>{cliente.cidade}</p>
                    </div>


                    <Button onClick={() => {
                        navigate('/');
                        delCliente();
                    }}
                    width={{base: 100, sm: 150, md: 150}}
                    colorScheme='red'>Apagar</Button>

                    <Button onClick={() => {
                        setNome(cliente.nome);
                        setCpf(cliente.cpf);
                        setNumeroCell(cliente.numeroCell);
                        setNumeroRes(cliente.numeroRes);
                        setEndereco(cliente.endereco);
                        setCidade(cliente.cidade);
                        setModalIsOpenCliEdit(true);
                    }}
                    width={{base: 100, sm: 150, md: 150}}
                    marginLeft={{base: 10, sm: 50, md: 150}}
                    colorScheme='blue'>Editar</Button>

                    <Modal
                        isOpen={modalIsOpenCliEdit}
                        onRequestClose={() => setModalIsOpenCliEdit(false)}
                        overlayClassName='modal-overlay'
                        className='modal-content'
                    >
                        <h1>Alterar dados do cliente</h1>

                        <label className='label'>Nome:</label>
                        <input
                            type='text'
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                            name='nome'
                            className='simpleText'
                        />
                        <label className='label'>CPF:</label>
                        <input
                            type='text'
                            value={cpf}
                            onChange={event => setCpf(event.target.value)}
                            name='cpf'
                            className='simpleText'
                        />
                        <label className='label'>Numero do celular:</label>
                        <input
                            type='text'
                            value={numeroCell}
                            onChange={event => setNumeroCell(event.target.value)}
                            name='numeroCell'
                            className='simpleText'
                        />
                        <label className='label'>Numero residencial:</label>
                        <input
                            type='text'
                            value={numeroRes}
                            onChange={event => setNumeroRes(event.target.value)}
                            name='numeroRes'
                            className='simpleText'
                        />
                        <label className='label'>Endereco:</label>
                        <input
                            type='text'
                            value={endereco}
                            onChange={event => setEndereco(event.target.value)}
                            name='endereco'
                            className='simpleText'
                        />
                        <label className='label'>Cidade:</label>
                        <input
                            type='text'
                            value={cidade}
                            onChange={event => setCidade(event.target.value)}
                            name='cidade'
                            className='simpleText'
                        />

                        <Button
                            rightIcon={<MdArrowForward/>}
                            onClick={() => editCliente()}
                            colorScheme='green'
                            width={200}
                            marginTop={25}
                            marginLeft={'55%'}>
                                Salvar
                        </Button>
                    </Modal>
                </div>



                <div className="cell-details">
                    <h2>Aparelhos</h2>
                    {ListAp}
                    
                    <Button onClick={() => setModalIsOpenApAdd(true)} leftIcon={<MdAdd />} colorScheme='green'>Novo aparelho</Button>
                    <Modal
                        isOpen={modalIsOpenApAdd}
                        onRequestClose={() => setModalIsOpenApAdd(false)}
                        overlayClassName='modal-overlay'
                        className='modal-content'
                    >
                        <h1>Adicionar novo aparelho</h1>

                        <label className='label'>Modelo:</label>
                        <input
                            type='text'
                            value={modelo}
                            onChange={event => setModelo(event.target.value)}
                            name='modelo'
                            placeholder='Samsung S20+'
                            className='simpleText'
                        />
                        <label className='label'>Descrição:</label>
                        <input
                            type='text'
                            value={descricao}
                            onChange={event => setDescricao(event.target.value)}
                            name='descricao'
                            placeholder='Troca do Touch e Software'
                            className='simpleText'
                        />
                        <label className='label'>Valor:</label>
                        <input
                            type='number'
                            value={valor}
                            onChange={event => setValor(event.target.value)}
                            name='valor'
                            placeholder='200,00'
                            className='simpleText'
                        />

                        <div className='box'>
                            <label className='label'>Pago:</label>
                            <input
                                type='checkbox'
                                value={pago}
                                onChange={() => setPago(!pago)}
                                name='pago'
                                className='checkInput'
                            />
                            <label className='label'>Situação:</label>
                            <select onChange={event => setSituacao(event.target.value)}>
                                <option value='Na fila'>Na fila</option>
                                <option value='Em manutenção'>Em manutenção</option>
                                <option value='Pronto'>Pronto</option>
                            </select>
                        </div>


                        <Button
                            rightIcon={<MdArrowForward/>}
                            onClick={addAparelho}
                            colorScheme='green'
                            width={200}
                            marginTop={25}
                            marginLeft={'55%'}>
                                Adicionar
                        </Button>
                    </Modal>


                    {aparelho ? 
                    <Modal
                        isOpen={modalIsOpenApPerfil}
                        onRequestClose={() => setModalIsOpenApPerfil(false)}
                        overlayClassName='modal-overlay'
                        className='modal-content'>

                        <h1>{aparelho.modelo}</h1>

                        <label className='label'>Descrição:</label>
                        <p>{aparelho.descricao}</p>

                        <label className='label'>Valor:</label>
                        <p>{aparelho.valor}</p>

                        <div className='box'>
                            <label className='label'>Pago:</label>
                            <input
                                type='checkbox'
                                value={pago}
                                name='pago'
                                className='checkInput'
                                checked={aparelho.pago}
                            />

                            <label className='label'>Situação:</label>
                            <p>{aparelho.situacao}</p>
                        </div>

                        <Button onClick={() => {
                            setModalIsOpenApPerfil(false);
                            delAparelho();
                        }} marginLeft={90} marginTop={30} colorScheme='red'>Apagar</Button>
                        <Button onClick={() => {
                            setModelo(aparelho.modelo);
                            setDescricao(aparelho.descricao);
                            setValor(aparelho.valor);
                            setPago(aparelho.pago);
                            setSituacao(aparelho.situacao);
                            setModalIsOpenApEdit(true);
                        }} width={100} marginLeft={100} marginTop={30} colorScheme='blue'>Editar</Button>
                    </Modal>
                    : <p/>}



                    <Modal
                        isOpen={modalIsOpenApEdit}
                        onRequestClose={() => setModalIsOpenApEdit(false)}
                        overlayClassName='modal-overlay'
                        className='modal-content'
                    >
                        <h1>Editar aparelho</h1>

                        <label className='label'>Modelo:</label>
                        <input
                            type='text'
                            value={modelo}
                            onChange={event => setModelo(event.target.value)}
                            name='modelo'
                            placeholder='Samsung S20+'
                            className='simpleText'
                        />
                        <label className='label'>Descrição:</label>
                        <input
                            type='text'
                            value={descricao}
                            onChange={event => setDescricao(event.target.value)}
                            name='descricao'
                            placeholder='Troca do Touch e Software'
                            className='simpleText'
                        />
                        <label className='label'>Valor:</label>
                        <input
                            type='number'
                            value={valor}
                            onChange={event => setValor(event.target.value)}
                            name='valor'
                            placeholder='200,00'
                            className='simpleText'
                        />

                        <div className='box'>
                            <label className='label'>Pago:</label>
                            <input
                                type='checkbox'
                                value={pago}
                                onChange={() => setPago(!pago)}
                                name='pago'
                                className='checkInput'
                                checked={pago}
                            />
                            <label className='label'>Situação:</label>
                            <select value={situacao} onChange={event => setSituacao(event.target.value)}>
                                <option value='Na fila'>Na fila</option>
                                <option value='Em manutenção'>Em manutenção</option>
                                <option value='Pronto'>Pronto</option>
                            </select>
                        </div>


                        <Button
                            rightIcon={<MdArrowForward/>}
                            onClick={() => editAparelho()}
                            colorScheme='green'
                            width={200}
                            marginTop={25}
                            marginLeft={'55%'}>
                                Salvar
                        </Button>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Perfil;


