import React from 'react';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { MdArrowForward, MdWest, MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import imgHomecell from '../../logo.png';
import Modal from 'react-modal';

import './stylesCadCli.css';

Modal.setAppElement('#root');

const CadCli = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [numeroCelular, setNumeroCelular] = useState('');
    const [numeroResidencial, setNumeroResidencial] = useState('');
    const [endereco, setEndereco] = useState('');
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [pago, setPago] = useState('');
    const [situacao, setSituacao] = useState('');

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

    function reset() {
        Array.from(document.querySelectorAll('input')).forEach(input => {
            input.value = ('');
        });
    }
 
    function submit(e) {
        const cliente = {
            nome,
            cpf,
            numeroCelular,
            numeroResidencial,
            endereco
        }
        console.log(cliente);
        reset();
    }

    return(
        <div className='container'>
            <img className='logo' src={imgHomecell} alt='HOME CELL' />

            <div className='divs'>
                <div className='container-form'>
                    <h1>Cadastrar Cliente</h1>

                    <div className='input-container'>
                        <label className='label'>Nome Completo:</label>
                        <input
                            type='text'
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                            name='nome'
                            placeholder='Thiago Pecorari Clemente'
                        />
                        <label className='label'>CPF:</label>
                        <input
                            type='text'
                            value={cpf}
                            onChange={event => setCpf(event.target.value)}
                            name='cpf'
                            placeholder='xxx.xxx.xxx.xx'
                        />
                        <label className='label'>Numero do Celular:</label>
                        <input
                            type='text'
                            value={numeroCelular}
                            onChange={event => setNumeroCelular(event.target.value)}
                            name='numeroCelular'
                            placeholder='(xx) xxxxx-xxxx'
                        />
                        <label className='label'>Numero Residencial:</label>
                        <input
                            type='text'
                            value={numeroResidencial}
                            onChange={event => setNumeroResidencial(event.target.value)}
                            name='numeroResidencial'
                            placeholder='(xx) xxxxx-xxxxx'
                        />
                        <label className='label'>Endereço:</label>
                        <input
                            type='text'
                            value={endereco}
                            onChange={event => setEndereco(event.target.value)}
                            name='endereco'
                            placeholder='Rua Curitiba 1317, Cidade Nova'
                        />
                    </div>

                    <Link to={'/'}>
                        <Button rightIcon={<MdWest/>} variant='outline'>
                            Voltar
                        </Button>
                    </Link>

                    <Button
                        rightIcon={<MdArrowForward/>}
                        onClick={submit}
                        colorScheme='green'
                        width={300}
                        marginLeft={150}>
                            Cadastrar
                    </Button>
                </div>

                <div className="cell-details">
                    <h2>Aparelhos</h2>
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
                                <option value='espera'>Em espera</option>
                                <option value='manutencao'>Em manutenção</option>
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

export default CadCli;
