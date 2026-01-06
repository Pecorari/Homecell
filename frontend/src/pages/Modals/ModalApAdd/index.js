import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, Checkbox, Stack, Text, Flex, Box, Image } from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';
import useApi from '../../../hooks/useApi';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../service/firebase';
import { v4 as uuid } from 'uuid';
import { CloseIcon } from '@chakra-ui/icons';
import imageCompression from 'browser-image-compression';

const ModalApAdd = ({isOpen, onClose, modelo, setModelo, descricao, setDescricao, valor, setValor, pago, setPago, situacao, setSituacao, observacao, setObservacao, id, reset, error, setError, setAparelhos,}) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());

  async function uploadImages() {
    const compressedFiles = await Promise.all(
      images.map(img =>
        imageCompression(img.file, {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1280,
          initialQuality: 0.7,
          useWebWorker: true
        })
      )
    );

    const uploadPromises = compressedFiles.map((file, index) => {
      return new Promise((resolve, reject) => {
        const imageId = images[index].id;
        const storageRef = ref(
          storage,
          `aparelhos/cliente-${id}/${uuid()}-${file.name}`
        );

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setImages(prev =>
              prev.map(img =>
                img.id === imageId
                  ? { ...img, progress, status: 'uploading' }
                  : img
              )
            );
          },
          reject,
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);

            setImages(prev =>
              prev.map(img =>
                img.id === imageId
                  ? { ...img, progress: 100, status: 'done' }
                  : img
              )
            );

            resolve(url);
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  }

  async function addAparelho() {
    if (!modelo || !valor || !descricao) {
      setError('Preencha os campos obrigatórios');
      return;
    }

    try {
      setUploading(true);

      const fotos = images.length > 0 ? await uploadImages() : [];

      const dadosCell = {
        modelo,
        descricao,
        valor,
        pago: Boolean(pago),
        situacao,
        observacao,
        fotos
      };

      const res = await useApi.post(`/cadastrar-aparelhos/${id}`, dadosCell, { withCredentials: true });

      setAparelhos(prev => [...prev, res.data]);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar aparelho');
    } finally {
      setUploading(false);
    }
  }

  function handleClose() {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setInputKey(Date.now());
    setError('');
    reset();
    onClose();
  }

  const ProgressCircle = ({ progress }) => {
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width="36" height="36">
        <circle cx="18" cy="18" r={radius} stroke="rgba(255,255,255,0.3)" strokeWidth="4" fill="none" />
        <circle cx="18" cy="18" r={radius} stroke="white" strokeWidth="4" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </svg>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
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
              <FormLabel>Serviço</FormLabel>
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

            <Button as="label" variant="outline" _hover={{ cursor: "pointer" }}>
              <Text display={{ base: "inline", md: "none" }}>Tirar foto ou Selecionar imagens</Text>
              <Text display={{ base: "none", md: "inline" }}>Selecionar imagens</Text>
              
              <Input key={inputKey} type="file" accept="image/*" capture="environment" multiple hidden onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);

                  const newImages = selectedFiles.map(file => ({
                    id: uuid(),
                    file,
                    preview: URL.createObjectURL(file),
                    progress: 0,
                    status: 'pending'
                  }));

                  if (images.length + newImages.length > 6) {
                    setError('Máximo de 6 fotos');
                    return;
                  }
                  
                  setError('');
                  setImages(prev => [...prev, ...newImages]);
                }}
              />
            </Button>

            <Flex wrap="wrap" gap={2}>
              {images.map(img => (
                <Box mx={'auto'} key={img.id} position="relative" w="70px" h="70px" borderRadius="md" overflow="hidden">
                  <Image src={img.preview} w="100%" h="100%" objectFit="cover"/>

                  {/* Overlay */}
                  {(img.status === 'uploading' || img.status === 'done') && (
                    <Flex position="absolute" inset="0" align="center" justify="center" bg="blackAlpha.600">
                      {img.status === 'done' ? (
                        <Box w="30px" h="30px" borderRadius="full" bg="green.500" display="flex" alignItems="center" justifyContent="center" color="white" fontSize="16px" fontWeight="bold" animation="pop 0.2s ease-out">
                          ✓
                        </Box>
                      ) : (
                        <ProgressCircle progress={img.progress} />
                      )}
                    </Flex>
                  )}

                  <Button size="xs" position="absolute" top="2px" right="2px" bg="red.500" color="white" borderRadius="full" minW="20px" h="20px" p={0} _hover={{ bg: 'red.600' }} onClick={() => {
                      URL.revokeObjectURL(img.preview);
                      setImages(prev => prev.filter(i => i.id !== img.id));
                    }}
                  >
                    <CloseIcon boxSize="10px" />
                  </Button>
                </Box>
              ))}
            </Flex>

            {error && (
              <Text as="span" color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={uploading}
            loadingText="Enviando imagens..."
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
