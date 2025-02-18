import Modal from 'react-modal';
import { Button } from '@chakra-ui/react';
import './stylesConfirm.css'

Modal.setAppElement('#root');

const ModalConfirm = ({modalIsOpenConfirm, setModalIsOpenConfirm, action, editCliente, delCliente, editAparelho, delAparelho}) => {
  return (
    <Modal
      isOpen={modalIsOpenConfirm}
      onRequestClose={() => setModalIsOpenConfirm(false)}
      overlayClassName='modal-overlay'
      className='modal-content-confirm'>
      <h1>CONFIRMAÇÃO</h1>

      <h2>Você tem certeza?</h2>
      <div>
        <Button
        onClick={() =>  setModalIsOpenConfirm(false)}
        colorScheme='red'>
          Cancelar
        </Button>
        <Button
        onClick={() => {
          setModalIsOpenConfirm(false);
          if (action === 'editCli') return editCliente()
          if (action === 'delCli') return delCliente()
          if (action === 'editAp') return editAparelho()
          if (action === 'delAp') return delAparelho()
        }}
        colorScheme='green'>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}

export default ModalConfirm;
