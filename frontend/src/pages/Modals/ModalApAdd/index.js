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
import useApi from '../../../hooks/useApi';

const ModalApAdd = ({
  isOpen,
  onClose,
  modelo, setModelo,
  descricao, setDescricao,
  valor, setValor,
  pago, setPago,
  situacao, setSituacao,
  observacao, setObservacao,
  id,
  reset,
  error, setError,
  setAparelhos,
}) => {

  function formatPagoValue(pagoValue) {
    return pagoValue ? 'Sim' : 'Não';
  }

  async function addAparelho() {
    const dadosCell = {
      modelo,
      descricao,
      valor,
      pago: formatPagoValue(pago),
      situacao,
      observacao,
    };

    try {
      const res = await useApi.post(`/cadastrar-aparelhos/${id}`, dadosCell, {
        withCredentials: true
      });

      setAparelhos(prev => [...prev, res.data]);
      setError('');
      reset();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar aparelho');
    }
  }

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
          Adicionar novo aparelho
        </ModalHeader>

        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Modelo</FormLabel>
              <Input
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Aparelho"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Serviço"
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
                placeholder="Preço"
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

              <Checkbox mt={{ base: '0', sm: '6' }} isChecked={pago} onChange={(e) => setPago(e.target.checked)}>
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
            onClick={addAparelho}
          >
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalApAdd;
