import React from 'react';
import { useState } from 'react';
import { MdArrowForward, MdAdd, MdWest } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import imgHomecell from '../../logo.png';
import Modal from 'react-modal';

import './stylesPer.css';

Modal.setAppElement('#root');

const Perfil = () => {
    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [pago, setPago] = useState('');
    const [situacao, setSituacao] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const today = new Date(Date.now());
    const todayFormat = today.toLocaleDateString()

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function addCell() {
        closeModal();
        console.log(modelo, descricao, valor, pago, situacao, todayFormat);
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
                        <p>Thiago Pecorari Clemente</p>
                        <label>CPF:</label>
                        <p>490.802.898-25</p>
                        <label>Número do Celular:</label>
                        <p>(19) 97401-2628</p>
                        <label>Número Residencial:</label>
                        <p>(19) 3629-4813</p>
                        <label>Endereço:</label>
                        <p>Rua Curitiba 1317, Cidade Nova, Santa Bárbara D'Oeste - SP</p>
                    </div>


                    <Button colorScheme='red'>
                        Apagar
                    </Button>

                    <Button colorScheme='blue' width={100} marginLeft={150}>
                            Editar
                    </Button>
                </div>

                <div className="cell-details">
                    <h2>Aparelhos</h2>
                    <div className='cell-inf'>
                        <div>
                            <p>23/06/2023</p>
                            <p>Samsung S20+</p>
                        </div>
                        <div>
                            <p>Troca do Touch e Software</p>
                        </div>
                        <div>
                            <p>200,00</p>
                        </div>
                        <div>
                            <p>true</p>
                            <p>pronto</p>
                        </div>
                    </div>
                    
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
                            <label>{todayFormat}</label>
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



