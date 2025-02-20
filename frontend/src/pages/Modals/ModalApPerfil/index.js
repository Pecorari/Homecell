import Modal from 'react-modal';
import { Button } from '@chakra-ui/react';

import './stylesApPerfil.css';

Modal.setAppElement('#root');

const ModalApPerfil = (params) => {
  const {
    modalIsOpenApPerfil,
    setModalIsOpenApPerfil,
    aparelho,
    pago,
    setModelo,
    setValor,
    setPago,
    setSituacao,
    setDescricao,
    setAction,
    setModalIsOpenApEdit,
    setModalIsOpenConfirm
  } = params

  function formatDate(dataHora) {
    const data = new Date(dataHora);
    return data.toLocaleDateString("pt-br", { timeZone: "UTC" });
  };

  return (
      <Modal
        isOpen={modalIsOpenApPerfil}
        onRequestClose={() => setModalIsOpenApPerfil(false)}
        overlayClassName='modal-overlay'
        className='modal-content-ApPerfil'>

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
        </div>
        <div className='box'>
            <label className='label'>Situação:</label>
            <p className='situacao'>{aparelho.situacao}</p>
        </div>
        <div className='createdUpdated'>
            <div>
            <label>Criado em:</label>
            <p>{formatDate(aparelho.created_at)}</p>
            </div>
            <div>
            <label>Ultima edição:</label>
            <p>{formatDate(aparelho.updated_at)}</p>
            </div>
        </div>
        <div className='btnApPerfil'>
            <Button onClick={() => {
                setModalIsOpenConfirm(true);
                setAction('delAp');
                console.log(aparelho.modelo);
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
  );
}

export default ModalApPerfil;
