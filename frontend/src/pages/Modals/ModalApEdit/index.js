import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, Checkbox, Stack, Text, Image, Box, Flex } from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';
import { CloseIcon } from '@chakra-ui/icons';

const ModalApEdit = ({ isOpen, onClose, modelo, setModelo, descricao, setDescricao, valor, setValor, pago, setPago, situacao, setSituacao, observacao, setObservacao, fotos, setFotos, setModalIsOpenApPerfil, setModalIsOpenConfirm, setAction, error, setError, isSaving }) => {
  const MAX_FOTOS = 6;
  const podeAdicionarFotos = fotos.length < MAX_FOTOS;

  const handleAddFotos = (e) => {
    const files = Array.from(e.target.files);

    if (fotos.length + files.length > MAX_FOTOS) {
      setError('Você pode ter no máximo 6 imagens');
      return;
    }

    const novasFotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      uploaded: false
    }));

    setFotos(prev => [...prev, ...novasFotos]);
    e.target.value = '';
  };

  const handleRemoveFoto = (index) => {
    setFotos(prev => {
      const foto = prev[index];
      if (!foto.uploaded) {
        URL.revokeObjectURL(foto.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setError('');
        setModalIsOpenApPerfil(true);
      }}
      closeOnOverlayClick={!isSaving}
      closeOnEsc={!isSaving}
      isCentered
      size='lg'
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent
        borderRadius="xl"
        mx={{ base: 4, sm: 0 }}
        display="flex"
        flexDirection="column"
        maxH="80vh"
      >
        <ModalHeader textAlign="center">
          Editar aparelho
        </ModalHeader>

        <ModalBody overflowY="auto" flex="1">
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

              <Checkbox mt={{ base: '0', sm: '6' }} isChecked={Boolean(pago)} onChange={(e) => setPago(e.target.checked)}>
                Pago
              </Checkbox>

            </Stack>

            <Box>
              <Text fontSize="sm" color="gray.500" mb={2}>
                Imagens
              </Text>

              <Button w="100%" mb="20px" as="label" variant="outline" isDisabled={!podeAdicionarFotos} _hover={{ cursor: "pointer" }}>
                {!podeAdicionarFotos ? (
                  <Text>
                    Limite de 6 imagens atingido
                  </Text>
                ) : <>
                      <Text display={{ base: "inline", md: "none" }}>Tirar foto ou Selecionar imagens</Text>
                      <Text display={{ base: "none", md: "inline" }}>Selecionar imagens</Text>
                    </>
                }
                <Input type="file" accept="image/*" capture="environment" multiple hidden onChange={handleAddFotos} isDisabled={!podeAdicionarFotos}/>
              </Button>

              {fotos && fotos.length > 0 ? (
                <Flex wrap="wrap" gap={0.5}>
                  {fotos.slice(0, 6).map((foto, index) => (
                    <Box key={index} position="relative" w={{ base: '25%', md: '75px' }} h="100px" borderRadius="md" overflow="hidden" cursor="pointer" border="1px solid" borderColor="gray.200" onClick={() => console.log(foto)}>
                      <Image src={foto.preview} alt={`Imagem ${index + 1}`} w="100%" h="100%" objectFit="cover" />

                      <Button size="xs" position="absolute" top="2px" right="2px" bg="red.500" color="white" borderRadius="full" minW="20px" h="20px" p={0} _hover={{ bg: 'red.700' }} onClick={(e) => {e.stopPropagation(); handleRemoveFoto(index);}}>
                        <CloseIcon boxSize="10px" />
                      </Button>
                    </Box>
                  ))}
                </Flex>
              ) : (
                <Text fontSize="sm" color="gray.400">
                  Nenhuma imagem cadastrada
                </Text>
              )}
            </Box>

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
            rightIcon={!isSaving && <MdArrowForward />}
            isLoading={isSaving}
            isDisabled={isSaving}
            loadingText="Salvando..."
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
