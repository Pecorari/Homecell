import React from 'react';
import { useState, useEffect } from 'react';
import { MdArrowForward, MdAdd, MdWest } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import imgHomecell from '../../logo.png';
import Modal from 'react-modal';
import useApi from '../../hooks/useApi';

import './stylesPer.css';

Modal.setAppElement('#root');

const Perfil = () => {
    const [cliente, setCliente] = useState({});
    const [aparelhos, setAparelhos] = useState([]);

    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [pago, setPago] = useState('');
    const [situacao, setSituacao] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const today = new Date(Date.now()).toLocaleDateString();

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
    });

    const ListAp = aparelhos.map(aparelho =>
            <div className='cell-inf' key={aparelho.id}>
                <div>
                    <p>{aparelho.created_at}</p>
                    <p>{aparelho.modelo}</p>
                </div>
                <div>
                    <p>{aparelho.descricao}</p>
                </div>
                <div>
                    <p>{aparelho.valor}</p>
                </div>
                <div>
                    <p>{aparelho.pago}</p>
                    <p>{aparelho.situacao}</p>
                </div>
            </div>
    )

    function delCliente() {
        useApi.delete(`/apagar-cliente/${id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))

        // <Link to='/'>
    };

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function addCell() {
        closeModal();
        console.log(modelo, descricao, valor, pago, situacao, today);
    }

    return(
        <div className='container'>
            <img className='logo' src={imgHomecell} alt='HOME CELL' />

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


                    <Button onClick={() => delCliente()} colorScheme='red'>Apagar</Button>

                    <Button width={100} marginLeft={150} colorScheme='blue'>Editar</Button>
                </div>

                <div className="cell-details">
                    <h2>Aparelhos</h2>
                    {ListAp}
                    
                    <Button onClick={() => openModal()} leftIcon={<MdAdd />} colorScheme='green'>Novo aparelho</Button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
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
                                onChange={event => setPago(event.target.value)}
                                name='pago'
                                className='checkInput'
                            />
                            <label className='label'>Situação:</label>
                            <select onChange={event => setSituacao(event.target.value)}>
                                <option value='Espera'>Em espera</option>
                                <option value='Manutencao'>Em manutenção</option>
                                <option value='pronto'>Pronto</option>
                            </select>
                        </div>

                        <div className='box2'>
                            <label>{today}</label>
                            <Button
                                rightIcon={<MdArrowForward/>}
                                onClick={addCell}
                                colorScheme='green'
                                width={150}
                                marginTop={25}
                                marginLeft={'45%'}>
                                    Adicionar
                            </Button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Perfil;



