import Modal from 'react-modal';
import { Button } from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';
import useApi from '../../../hooks/useApi';

Modal.setAppElement('#root');

const ModalApAdd = (params) => {
  const {
    modalIsOpenApAdd, setModalIsOpenApAdd,
    modelo, setModelo,
    descricao, setDescricao,
    valor, setValor,
    pago, setPago,
    situacao, setSituacao,
    observacao, setObservacao,
    id, reset,
    error, setError,
    setAparelhos
  } = params

  async function addAparelho() {
    let formatPago = ''

    if (pago === 0) {
        formatPago = 'Não'
    } else formatPago = 'Sim'

    const dadosCell = {
        modelo,
        descricao,
        valor,
        formatPago,
        situacao,
        observacao
    }

    await useApi.post(`/cadastrar-aparelhos/${id}`, dadosCell, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setAparelhos(prevAparelho => [...prevAparelho, res.data]);
          setModalIsOpenApAdd(false);
          setError('');
          reset();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setError(err.response.data.message);
        })   
}

  return (
    <Modal
      isOpen={modalIsOpenApAdd}
      onRequestClose={() => {
        setModalIsOpenApAdd(false);
        setError('')
      }}
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
      <label className='label'>observação:</label>
      <input
          type='text'
          value={observacao}
          onChange={event => setObservacao(event.target.value)}
          name='observacao'
          placeholder='Obs.'
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

      <p id='error'>{error}</p>

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
  );
}

export default ModalApAdd;
