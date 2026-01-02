import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';

const ModalApEdit = ({
  isOpen,
  onClose,
  modelo, setModelo,
  descricao, setDescricao,
  valor, setValor,
  pago, setPago,
  situacao, setSituacao,
  observacao, setObservacao,
  setModalIsOpenConfirm,
  setAction,
  error,
  setError,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setError('');
      }}
      isCentered
      size='lg'
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent
        borderRadius="xl"
        mx={{ base: 4, sm: 0 }}
      >
        <ModalHeader textAlign="center">
          Editar aparelho
        </ModalHeader>

        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Modelo</FormLabel>
              <Input
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Samsung S20+"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Troca do touch e software"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Observação</FormLabel>
              <Input
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Obs."
              />
            </FormControl>

            <FormControl>
              <FormLabel>Valor</FormLabel>
              <Input
                type="number"
                value={valor || ''}
                onChange={(e) => setValor(e.target.value)}
                placeholder="200,00"
              />
            </FormControl>

            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
              align="left"
            >
              <FormControl>
                <FormLabel>Situação</FormLabel>
                <Select value={situacao} onChange={(e) => setSituacao(e.target.value)}>
                  <option value="Na fila">Na fila</option>
                  <option value="Em manutenção">Em manutenção</option>
                  <option value="Pronto">Pronto</option>
                </Select>
              </FormControl>

              <Checkbox mt={{ base: '0', sm: '6' }} isChecked={pago === true || pago === 'Sim'} onChange={(e) => setPago(e.target.checked)}>
                Pago
              </Checkbox>

            </Stack>

            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            w="100%"
            rightIcon={<MdArrowForward />}
            onClick={() => {
              setModalIsOpenConfirm(true);
              setAction('editAp');
            }}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalApEdit;
