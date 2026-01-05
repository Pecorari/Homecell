import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';

import { MdArrowForward } from 'react-icons/md';
import InputMask from 'react-input-mask';

const ModalEditCli = (params) => {
  const {
    modalIsOpenCliEdit,
    setModalIsOpenCliEdit,
    nome, setNome, cpf, setCpf,
    numeroCell, setNumeroCell,
    numeroRes, setNumeroRes,
    endereco, setEndereco,
    cidade, setCidade,
    setModalIsOpenConfirm,
    setAction,
    error, setError,
  } = params;

  const handleClose = () => {
    setModalIsOpenCliEdit(false);
    setError('');
  };

  return (
    <Modal
      isOpen={modalIsOpenCliEdit}
      onClose={handleClose}
      size="lg"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />

      <ModalContent borderRadius="xl" mx={{ base: 4, sm: 6 }}>
        <ModalHeader>Alterar dados do cliente</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="stretch">

            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>CPF</FormLabel>
              <Input
                as={InputMask}
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Número do celular</FormLabel>
              <Input
                as={InputMask}
                mask="(99) 99999-9999"
                value={numeroCell}
                onChange={(e) => setNumeroCell(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Número residencial</FormLabel>
              <Input
                as={InputMask}
                mask="(99) 9999-9999"
                value={numeroRes}
                onChange={(e) => setNumeroRes(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Endereço</FormLabel>
              <Input
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Cidade</FormLabel>
              <Input
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </FormControl>

            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            rightIcon={<MdArrowForward />}
            onClick={() => {
              setModalIsOpenConfirm(true);
              setAction('editCli');
            }}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditCli;
