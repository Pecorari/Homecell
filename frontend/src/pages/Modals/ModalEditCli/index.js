import Modal from 'react-modal';
import { Button } from '@chakra-ui/react'
import { MdArrowForward } from 'react-icons/md';
import InputMask from 'react-input-mask';

Modal.setAppElement('#root');

const ModalEditCli = (params) => {
  const {
    modalIsOpenCliEdit, setModalIsOpenCliEdit,
    nome, setNome,
    cpf, setCpf,
    numeroCell, setNumeroCell,
    numeroRes, setNumeroRes,
    endereco, setEndereco,
    cidade, setCidade,
    setModalIsOpenConfirm, setAction,
    error, setError } = params

  return (
    <Modal
      isOpen={modalIsOpenCliEdit}
      onRequestClose={() => {
        setModalIsOpenCliEdit(false);
        setError('');
      }}
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

      <p id='error'>{error}</p>

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
  )
}

export default ModalEditCli;
