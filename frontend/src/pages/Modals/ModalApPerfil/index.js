import { useRef, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Stack, Box, Flex, Checkbox, Divider, Image } from '@chakra-ui/react';

import './notaCliente.css';

import imgHomecell from '../../../utils/logo.png';

const ModalApPerfil = ({ isOpen, onClose, aparelho, setModelo, setValor, setPago, setSituacao, setDescricao, setObservacao, setFotos, setAction, setModalIsOpenApEdit, setModalIsOpenConfirm, cliente }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const notaRef = useRef(null);

  function formatDate(dataHora) {
    const data = new Date(dataHora);
    return data.toLocaleDateString('pt-br', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const dataNota = new Date();

  if (!aparelho) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size='lg'
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.600" />

        <ModalContent borderRadius="xl" mx={{ base: 3, md: 0 }}>
          <ModalHeader textAlign="center">
            {aparelho.modelo}
          </ModalHeader>

          <ModalBody>
            <Stack spacing={4}>
              <Box>
                <Text fontSize="sm" color="gray.500">Serviço</Text>
                <Text>{aparelho.descricao || '-'}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500">Observação</Text>
                <Text>{aparelho.observacao || '-'}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500">Valor</Text>
                <Text fontWeight="medium">R$ {aparelho.valor}</Text>
              </Box>

              <Flex gap={12} flexWrap="wrap">
                <Box>
                  <Text fontSize="sm" color="gray.500">Situação</Text>
                  <Text fontWeight="medium">{aparelho.situacao}</Text>
                </Box>

                <Checkbox isChecked={aparelho.pago === 'Sim'} isReadOnly>
                  Pago
                </Checkbox>
              </Flex>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Imagens
                </Text>

                {aparelho.fotos && aparelho.fotos.length > 0 ? (
                  <Flex wrap="wrap" gap={0.5}>
                    {aparelho.fotos.slice(0, 6).map((foto, index) => (
                      <Box key={index} w={{ base: '25%', md: '75px' }} h="100px" borderRadius="md" overflow="hidden" cursor="pointer" border="1px solid" borderColor="gray.200" _hover={{ opacity: 0.8 }} onClick={() => setSelectedImage(foto)}>
                        <Image src={foto} alt={`Imagem ${index + 1}`} w="100%" h="100%" objectFit="cover" />
                      </Box>
                    ))}
                  </Flex>
                ) : (
                  <Text fontSize="sm" color="gray.400">
                    Nenhuma imagem cadastrada
                  </Text>
                )}
              </Box>

              <Modal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                isCentered
                size="xl"
              >
                <ModalOverlay bg="blackAlpha.800" />

                <ModalContent bg="transparent" boxShadow="none">
                  <ModalBody display="flex" justifyContent="center">
                    <Image
                      src={selectedImage}
                      maxH="80vh"
                      borderRadius="lg"
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>

              <Divider />

              <Flex gap={6} fontSize="sm" color="gray.500" flexWrap="wrap">
                <Box>
                  <Text>Criado em</Text>
                  <Text>{formatDate(aparelho.created_at)}</Text>
                </Box>
                <Box>
                  <Text>Última edição</Text>
                  <Text>{formatDate(aparelho.updated_at)}</Text>
                </Box>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack w="100%" spacing={3}>
              <Button
                variant="outline"
                onClick={() => window.print()}
              >
                Imprimir
              </Button>

              <Flex gap={3}>
                <Button
                  w="100%"
                  colorScheme="red"
                  onClick={() => {
                    setAction('delAp');
                    setModalIsOpenConfirm(true);
                  }}
                >
                  Apagar
                </Button>

                <Button
                  w="100%"
                  colorScheme="blue"
                  onClick={() => {
                    setModelo(aparelho.modelo);
                    setDescricao(aparelho.descricao);
                    setValor(aparelho.valor);
                    setPago(aparelho.pago);
                    setSituacao(aparelho.situacao);
                    setObservacao(aparelho.observacao);
                    setFotos(aparelho.fotos.map(url => ({
                      preview: url,
                      uploaded: true
                    })));
                    setModalIsOpenApEdit(true);
                  }}
                >
                  Editar
                </Button>
              </Flex>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ===== NOTA DO CLIENTE ===== */}
      <div ref={notaRef} className="nota-container">
        <div className='viaUm'>
          <img className='logo' src={imgHomecell} alt='HOME CELL' />
          <h1>Ordem de Serviço</h1>
          <div className="info">
            <div className='dadosEmpresa'>
              <div>
                <p><strong>Empresa: Homecell</strong> </p>
                <p><strong>Rua do algodão 1181</strong></p>
              </div>
              <div>
                <p><strong>CNPJ: 22.066.257/0001-64</strong></p>
                <p><strong>Cidade Nova</strong></p>
              </div>
              <div>
                <p><strong>Telefone: (19)3629-4813</strong></p>
                <p><strong>Santa Bárbara D'Oeste</strong></p>
              </div>
            </div>

            <div className='dadosCliente'>
              <h1>Dados do Cliente</h1>
              <div className='dadosCliente2'>
                <div>
                  <p><strong>Cliente:</strong> {cliente.nome}</p>
                  <p><strong>CPF:</strong> {cliente.cpf}</p>
                </div>
                <div>
                  <p><strong>Celular:</strong> {cliente.numeroCell}</p>
                  <p><strong>Telefone:</strong> {cliente.numeroRes}</p>
                </div>
                <div>
                  <p><strong>Endereço:</strong> {cliente.endereco}</p>
                  <p><strong>Cidade:</strong> {cliente.cidade}</p>
                </div>
              </div>
            </div>

            <div className='dadosAparelho'>
              <h1>Descrição técnica</h1>
              <div className='dadosAparelho2'>
                  <p><strong>Modelo:</strong> {aparelho.modelo}</p>
                <div className='descFlutuante'>
                  <p><strong>Descrição:</strong> {aparelho.descricao}</p>
                </div>
                  <p><strong>Preço Manutenção:</strong> R$ {aparelho.valor}</p>
                <div>
                  <p><strong>Pago:</strong> {aparelho.pago}</p>
                  <p><strong>Situação:</strong> {aparelho.situacao}</p>
                </div>
                
              </div>
            </div>
          </div>

          <div className="termo">
            <h1>TERMO DE APROVAÇÃO E AUTORIZAÇÃO DE SERVIÇO</h1>
            <p>Eu <strong>{cliente.nome}</strong> acima qualificado aprovo e autorizo a realização de manutenção do equipamento descriminado e individualizado <strong>{aparelho.modelo}</strong> de minha propriedade.</p>
            <p>Neste ato, tomo conhecimento de que a não retirada do equipamento no prazo de até 90 dias acarretará a adoção das medidas judiciais cabíveis para integral do pagamento do valor referente ao conserto, podendo o prestador de serviço valer-se do disposto nos artigos 1.170 a 1.176 do Código de Processo Civil, para tal fim.</p>
            <p>Além do valor devido pela manutenção, fico ciente do cumprimento do certificado de que responderei por perdas e danos, pela guarda do aparelho com o pagamento de aluguel e pelas demais despesas necessárias à realização de notificações e cobranças, inclusive despesas judiciais e honorários advocatícios.</p>
            <p className='lastP'><strong>Santa Bárbara D’Oeste, {dataNota.toLocaleDateString('pt-BR')}</strong></p>
          </div>

          <div className="assinatura">
              <p>Assinatura do Cliente</p>
          </div>
        </div>
        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        <br/>
        <br/>
        <div className='viaDois'>
          <img className='logo' src={imgHomecell} alt='HOME CELL' />
          <h1>Ordem de Serviço</h1>
          <div className="info">
            <div className='dadosEmpresa'>
              <div>
                <p><strong>Empresa: Homecell</strong> </p>
                <p><strong>Rua do algodão 1181</strong></p>
              </div>
              <div>
                <p><strong>CNPJ: 22.066.257/0001-64</strong></p>
                <p><strong>Cidade Nova</strong></p>
              </div>
              <div>
                <p><strong>Telefone: (19)3629-4813</strong></p>
                <p><strong>Santa Bárbara D'Oeste</strong></p>
              </div>
            </div>

            <div className='dadosCliente'>
              <h1>Dados do Cliente</h1>
              <div className='dadosCliente2'>
                <div>
                  <p><strong>Cliente:</strong> {cliente.nome}</p>
                  <p><strong>CPF:</strong> {cliente.cpf}</p>
                </div>
                <div>
                  <p><strong>Celular:</strong> {cliente.numeroCell}</p>
                  <p><strong>Telefone:</strong> {cliente.numeroRes}</p>
                </div>
                <div>
                  <p><strong>Endereço:</strong> {cliente.endereco}</p>
                  <p><strong>Cidade:</strong> {cliente.cidade}</p>
                </div>
              </div>
            </div>

            <div className='dadosAparelho'>
              <h1>Descrição técnica</h1>
              <div className='dadosAparelho2'>
                  <p><strong>Modelo:</strong> {aparelho.modelo}</p>
                <div className='descFlutuante'>
                  <p><strong>Descrição:</strong> {aparelho.descricao}</p>
                </div>
                  <p><strong>Preço Manutenção:</strong> R$ {aparelho.valor}</p>
                <div>
                  <p><strong>Pago:</strong> {aparelho.pago}</p>
                  <p><strong>Situação:</strong> {aparelho.situacao}</p>
                </div>
                
              </div>
            </div>
          </div>

          <div className="termo">
            <h1>TERMO DE APROVAÇÃO E AUTORIZAÇÃO DE SERVIÇO</h1>
            <p>Eu <strong>{cliente.nome}</strong> acima qualificado aprovo e autorizo a realização de manutenção do equipamento descriminado e individualizado <strong>{aparelho.modelo}</strong> de minha propriedade.</p>
            <p>Neste ato, tomo conhecimento de que a não retirada do equipamento no prazo de até 90 dias acarretará a adoção das medidas judiciais cabíveis para integral do pagamento do valor referente ao conserto, podendo o prestador de serviço valer-se do disposto nos artigos 1.170 a 1.176 do Código de Processo Civil, para tal fim.</p>
            <p>Além do valor devido pela manutenção, fico ciente do cumprimento do certificado de que responderei por perdas e danos, pela guarda do aparelho com o pagamento de aluguel e pelas demais despesas necessárias à realização de notificações e cobranças, inclusive despesas judiciais e honorários advocatícios.</p>
            <p>Em Manutenção referente a troca de frontal a garantia é de 90 dias e não cobre o mal uso como "risco, impacto, umidade, entre outros"</p>
            <p className='lastP'><strong>Santa Bárbara D’Oeste, {dataNota.toLocaleDateString('pt-BR')}</strong></p>
          </div>

          <div className="assinatura">
            <p>Assinatura do Cliente</p>
          </div>
          <div className="testadoRestirado">
            <p>Aparelho testado e retirado por: __________________________________________</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalApPerfil;
