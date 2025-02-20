import Modal from 'react-modal';
import { Button } from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';

Modal.setAppElement('#root');

const ModalApEdit = (params) => {
  const {
    modalIsOpenApEdit, setModalIsOpenApEdit,
    modelo, setModelo,
    descricao, setDescricao,
    valor, setValor,
    pago, setPago,
    situacao, setSituacao,
    setModalIsOpenConfirm, setAction,
    error, setError
  } = params

  return (
    <Modal
      isOpen={modalIsOpenApEdit}
      onRequestClose={() => {
        setModalIsOpenApEdit(false);
        setError('');
      }}
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

      <p id='error'>{error}</p>

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
  );
}

export default ModalApEdit
