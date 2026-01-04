import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Stack} from '@chakra-ui/react';

const ModalConfirm = ({ isOpen, onClose, action, editCliente, delCliente, editAparelho, delAparelho }) => {

  const handleConfirm = () => {
    onClose();

    if (action === 'editCli') editCliente?.();
    if (action === 'delCli') delCliente?.();
    if (action === 'editAp') editAparelho?.();
    if (action === 'delAp') delAparelho?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'md'}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent
        borderRadius="xl"
        mx={{ base: 4, sm: 0 }}
      >
        <ModalHeader textAlign="center">
          CONFIRMAÇÃO
        </ModalHeader>

        <ModalBody textAlign="center">
          <Text fontSize={{ base: 'md', sm: 'lg' }}>
            Você tem certeza?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={4}
            w="100%"
          >
            <Button
              w="100%"
              colorScheme="red"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              w="100%"
              colorScheme="green"
              onClick={handleConfirm}
            >
              Confirmar
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
