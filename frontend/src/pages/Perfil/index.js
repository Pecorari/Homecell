import React from 'react';
import { useState, useEffect } from 'react';
import { MdArrowForward, MdAdd, MdWest } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import imgHomecell from '../../utils/logo.png';
import ModalConfirm from '../Modals';
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
    const [valor, setValor] = useState();
    const [pago, setPago] = useState(false);
    const [situacao, setSituacao] = useState('Na fila');

    const [action, setAction] = useState('');

    const [modalIsOpenApAdd, setModalIsOpenApAdd] = useState(false);
    const [modalIsOpenApPerfil, setModalIsOpenApPerfil] = useState(false);
    const [modalIsOpenApEdit, setModalIsOpenApEdit] = useState(false);
    const [modalIsOpenCliEdit, setModalIsOpenCliEdit] = useState(false);
    const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);

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
                <div className='cellModDate'>
                    <p>{aparelho.modelo}</p>
                    <p>{formatDate(aparelho.created_at)}</p>
                </div>
                <div className='cellP'>
                    <p>Situação:</p>
                    <p>Pago:</p>
                </div>
                <div className='cellPagSit'>
                    <p>{aparelho.situacao}</p>
                    <p>{aparelho.pago}</p>
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
        setAction('');
    };

    async function delCliente() {
        await useApi.delete(`/apagar-cliente/${id}`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
            
            navigate('/');
        setAction('');
    };
    
    async function getUniqueAp() {
        await useApi.get(`/cliente-aparelhos/${id}/${idAp}`)
            .then((res) => {
                let [result] = res.data;
                setAparelho(result);
            })
            .catch((err) => console.log(err))
    };
        
    async function addAparelho() {
        let formatPago = ''

        if (pago === false) {
            formatPago = 'Não'
        } else formatPago = 'Sim'

        const dadosCell = {
            modelo,
            descricao,
            valor,
            formatPago,
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
        
        setModalIsOpenApPerfil(false);
        setAction('');
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
        setValor();
        setSituacao('Na fila');
        setPago(false);
    }

    function formatDate(dataHora) {
        const data = new Date(dataHora);
        return data.toLocaleDateString("pt-br", { timeZone: "UTC" });
    };
    function formatCPF(cpf) {
        if (cpf) {
            cpf = cpf.replace(/[^\d]/g, ""); // Tira os elementos indesejados
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // Realiza a formatação
        }
    };
    function formatNumCell(numCell) {
        if(numCell) {
            numCell = numCell.replace(/[^\d]/g, "");
            return numCell.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
    };
    function formatNumRes(numRes) {
        if(numRes) {
            numRes = numRes.replace(/[^\d]/g, "");
            return numRes.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
    };

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
                        <p>{formatCPF(cliente.cpf)}</p>
                        <label>Número do Celular:</label>
                        <p>{formatNumCell(cliente.numeroCell)}</p>
                        <label>Número Residencial:</label>
                        <p>{formatNumRes(cliente.numeroRes)}</p>
                        <label>Endereço:</label>
                        <p>{cliente.endereco}</p>
                        <label>Cidade:</label>
                        <p>{cliente.cidade}</p>
                    </div>


                    <Button onClick={() => {
                        setModalIsOpenConfirm(true);
                        setAction('delCli');
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
                        <InputMask
                            mask='999.999.999-99'
                            value={cpf}
                            onChange={event => setCpf(event.target.value)}
                            name='cpf'
                            className='simpleText'
                        />
                        <label className='label'>Numero do celular:</label>
                        <InputMask
                            mask='(99) 99999-9999'
                            value={numeroCell}
                            onChange={event => setNumeroCell(event.target.value)}
                            name='numeroCell'
                            className='simpleText'
                        />
                        <label className='label'>Numero residencial:</label>
                        <InputMask
                            mask='(99) 9999-9999'
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
                            onClick={() => {
                                setModalIsOpenConfirm(true);
                                setAction('editCli');
                            }}
                            colorScheme='green'
                            width={{base: 200, sm: 250, md: 250}}
                            marginTop={15}
                            marginLeft={{base: 8, sm: 8, md: 50}}>
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
                                onChange={() => {
                                    setPago(!pago);
                                }}
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
                            width={250}
                            marginTop={15}
                            marginLeft={{base: 3, sm: 8, md: 50}}>
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
                        <p className='txtApPerfil'>{aparelho.descricao}</p>

                        <label className='label'>Valor:</label>
                        <p className='txtApPerfil'>R$ {aparelho.valor}</p>

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
                        <div className='btnApPerfil'>
                            <Button onClick={() => {
                                setModalIsOpenConfirm(true);
                                setAction('delAp');
                            }} width={100} marginLeft={0} marginTop={5} colorScheme='red'>Apagar</Button>
                            <Button onClick={() => {
                                setModelo(aparelho.modelo);
                                setDescricao(aparelho.descricao);
                                setValor(aparelho.valor);
                                setPago(aparelho.pago);
                                setSituacao(aparelho.situacao);
                                setModalIsOpenApEdit(true);
                        }} width={100} marginLeft={50} marginTop={5} colorScheme='blue'>Editar</Button>
                        </div>
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
                            onClick={() => {
                                setModalIsOpenConfirm(true);
                                setAction('editAp');
                            }}
                            colorScheme='green'
                            width={250}
                            marginTop={15}
                            marginLeft={'2.5%'}>
                                Salvar
                        </Button>
                    </Modal>

                    <ModalConfirm 
                    modalIsOpenConfirm={modalIsOpenConfirm}
                    setModalIsOpenConfirm={setModalIsOpenConfirm}
                    action={action}
                    editCliente={editCliente}
                    delCliente={delCliente}
                    editAparelho={editAparelho}
                    delAparelho={delAparelho}
                    />
                </div>
            </div>
        </div>
    );
}

export default Perfil;


