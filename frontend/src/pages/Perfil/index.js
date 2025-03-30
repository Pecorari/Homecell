import React from 'react';
import { useState, useEffect } from 'react';
import { MdAdd, MdWest } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import imgHomecell from '../../utils/logo.png';
import ModalConfirm from '../Modals/ModalConfirm';
import ModalEditCli from '../Modals/ModalEditCli';
import ModalApAdd from '../Modals/ModalApAdd';
import ModalApPerfil from '../Modals/ModalApPerfil';
import ModalApEdit from '../Modals/ModalApEdit';
import useApi from '../../hooks/useApi';
import Modal from 'react-modal';
import useAuth from '../../utils/useAuth';

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
    const [observacao, setObservacao] = useState('');

    const [action, setAction] = useState('');

    const [modalIsOpenApAdd, setModalIsOpenApAdd] = useState(false);
    const [modalIsOpenApPerfil, setModalIsOpenApPerfil] = useState(false);
    const [modalIsOpenApEdit, setModalIsOpenApEdit] = useState(false);
    const [modalIsOpenCliEdit, setModalIsOpenCliEdit] = useState(false);
    const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);

    const [idAp, setIdAp] = useState('');
    const [aparelho, setAparelho] = useState({});

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {    
        useApi.get(`/clientes/${id}`, { withCredentials: true })
            .then((res) => {
                const [dataCli] = res.data
                setCliente(dataCli);
            })
            .catch((err) => console.log(err))
// eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        useApi.get(`cliente-aparelhos/${id}`, { withCredentials: true })
        .then((res) => {
            setAparelhos(res.data);
        })
        .catch((err) => console.log(err))
// eslint-disable-next-line
    }, [idAp, modalIsOpenApPerfil, modalIsOpenApAdd]);

    useEffect(() => {
        if (idAp) {
// eslint-disable-next-line
            getUniqueAp();
        }
// eslint-disable-next-line
    }, [idAp]);
    
    const ListAp = aparelhos.map(aparelho => 
        <Link onClick={() => {
            setIdAp(aparelho.id);
            getUniqueAp();
            setModalIsOpenApPerfil(true);
        }} key={aparelho.id}>
            <div className='cell-inf'>
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
    
        await useApi.put(`/editar-cliente/${id}`, dadosCli, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setModalIsOpenCliEdit(false);
                setAction('');
                setError('');
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            })
    };

    async function delCliente() {
        await useApi.delete(`/apagar-cliente/${id}`, { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
            
            navigate('/clientes');
        setAction('');
    };
    
    async function getUniqueAp() {
        await useApi.get(`/cliente-aparelhos/${id}/${idAp}`, { withCredentials: true })
            .then((res) => {
                let [result] = res.data;
                setAparelho(result);
            })
            .catch((err) => console.log(err))
    };

    async function delAparelho() {
        await useApi.delete(`apagar-aparelhos/${idAp}`, { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        
        setModalIsOpenApPerfil(false);
        setAction('');
        reset();
        window.location.reload();
    };

    async function editAparelho() {
        const pagoString = pago ? 'Sim' : 'Não';

        const dadosCellEdit = {
            modelo,
            descricao,
            valor,
            pago: pagoString,
            situacao,
            observacao
        }

        await useApi.put(`/editar-aparelhos/${idAp}`, dadosCellEdit, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                reset();
                setError('');
                setModalIsOpenApEdit(false);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            })
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

    const { loading } = useAuth();
    if(loading) return <p>CARREGANDO...</p>;

    return(
        <div className='containerPerfil'>
            <div className='divLogo'>
                <Link to={'/clientes'}>
                    <img className='logo' src={imgHomecell} alt='HOME CELL' />
                </Link>
            </div>

            <div className='divs'>
                <div className='container-perfil'>
                    <div className='top'>
                        <Link to={'/clientes'}>
                            <MdWest className='icon'/>
                        </Link>
                        <h1>Perfil</h1>
                    </div>

                    <div className='perfil'>
                        <label>Nome:</label>
                        <p>{cliente.nome}</p>
                        <label>CPF:</label>
                        <p>{(cliente.cpf && cliente.cpf.length > 0) ? formatCPF(cliente.cpf) : '000.000.000-00'}</p>
                        <label>Número do Celular:</label>
                        <p>{formatNumCell(cliente.numeroCell)}</p>
                        <label>Número Residencial:</label>
                        <p>{formatNumRes(cliente.numeroRes)}</p>
                        <label>Endereço:</label>
                        <p>{cliente.endereco}</p>
                        <label>Cidade:</label>
                        <p>{cliente.cidade}</p>
                    </div>

                    <div className='createdUpdated'>
                        <div>
                            <label>Criado em:</label>
                            <p>{formatDate(cliente.created_at)}</p>
                        </div>
                        <div>
                            <label>Ultima edição:</label>
                            <p>{formatDate(cliente.updated_at)}</p>
                        </div>
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

                    <ModalEditCli 
                        modalIsOpenCliEdit={modalIsOpenCliEdit}
                        setModalIsOpenCliEdit={setModalIsOpenCliEdit}
                        nome={nome}
                        setNome={setNome}
                        cpf={cpf}
                        setCpf={setCpf}
                        numeroCell={numeroCell}
                        setNumeroCell={setNumeroCell}
                        numeroRes={numeroRes}
                        setNumeroRes={setNumeroRes}
                        endereco={endereco}
                        setEndereco={setEndereco}
                        cidade={cidade}
                        setCidade={setCidade}
                        setModalIsOpenConfirm={setModalIsOpenConfirm}
                        setAction={setAction}
                        error={error}
                        setError={setError}
                    />
                </div>

                <div className="cell-details">
                    <h2>Aparelhos</h2>
                    {ListAp}

                    <Button onClick={() => setModalIsOpenApAdd(true)} leftIcon={<MdAdd />} colorScheme='green'>Novo aparelho</Button>
                    <ModalApAdd
                        modalIsOpenApAdd={modalIsOpenApAdd}
                        setModalIsOpenApAdd={setModalIsOpenApAdd}
                        modelo={modelo}
                        setModelo={setModelo}
                        descricao={descricao}
                        setDescricao={setDescricao}
                        valor={valor}
                        setValor={setValor}
                        pago={pago}
                        setPago={setPago}
                        situacao={situacao}
                        setSituacao={setSituacao}
                        observacao={observacao}
                        setObservacao={setObservacao}
                        id={id}
                        reset={reset}
                        error={error}
                        setError={setError}
                        setAparelhos={setAparelhos}
                    />
                    {aparelho ? 
                    <ModalApPerfil
                        modalIsOpenApPerfil={modalIsOpenApPerfil}
                        setModalIsOpenApPerfil={setModalIsOpenApPerfil}
                        aparelho={aparelho}
                        setModelo={setModelo}
                        setValor={setValor}
                        setPago={setPago}
                        setSituacao={setSituacao}
                        setDescricao={setDescricao}
                        setObservacao={setObservacao}
                        setAction={setAction}
                        setModalIsOpenApEdit={setModalIsOpenApEdit}
                        setModalIsOpenConfirm={setModalIsOpenConfirm}
                        cliente={cliente}
                    />
                    : <p/>}
                    <ModalApEdit
                        modalIsOpenApEdit={modalIsOpenApEdit}
                        setModalIsOpenApEdit={setModalIsOpenApEdit}
                        modelo={modelo}
                        setModelo={setModelo}
                        descricao={descricao}
                        setDescricao={setDescricao}
                        valor={valor}
                        setValor={setValor}
                        pago={pago}
                        setPago={setPago}
                        situacao={situacao}
                        setSituacao={setSituacao}
                        observacao={observacao}
                        setObservacao={setObservacao}
                        setModalIsOpenConfirm={setModalIsOpenConfirm}
                        setAction={setAction}
                        error={error}
                        setError={setError}
                    />
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
// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default Perfil;


