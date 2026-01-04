import { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Flex, Text, Grid, Button } from '@chakra-ui/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../service/firebase';
import imageCompression from 'browser-image-compression';
import { v4 as uuid } from 'uuid';
import ModalConfirm from '../Modals/ModalConfirm';
import ModalEditCli from '../Modals/ModalEditCli';
import ModalApAdd from '../Modals/ModalApAdd';
import ModalApPerfil from '../Modals/ModalApPerfil';
import ModalApEdit from '../Modals/ModalApEdit';
import useApi from '../../hooks/useApi';
import Header from '../../components/Header';
import useAuth from '../../utils/useAuth';

const Perfil = () => {
    const [cliente, setCliente] = useState({});
    const [aparelhos, setAparelhos] = useState([]);

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [numeroCell, setNumeroCell] = useState('');
    const [numeroRes, setNumeroRes] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');

    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState();
    const [pago, setPago] = useState(false);
    const [situacao, setSituacao] = useState('Na fila');
    const [observacao, setObservacao] = useState('');
    const [fotos, setFotos] = useState([]);

    const [action, setAction] = useState('');

    const [modalIsOpenApAdd, setModalIsOpenApAdd] = useState(false);
    const [modalIsOpenApPerfil, setModalIsOpenApPerfil] = useState(false);
    const [modalIsOpenApEdit, setModalIsOpenApEdit] = useState(false);
    const [modalIsOpenCliEdit, setModalIsOpenCliEdit] = useState(false);
    const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);

    const [idAp, setIdAp] = useState('');
    const [aparelho, setAparelho] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {    
        useApi.get(`/clientes/${id}`, { withCredentials: true })
            .then((res) => {
                const [dataCli] = res.data
                setCliente(dataCli);
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        useApi.get(`cliente-aparelhos/${id}`, { withCredentials: true })
            .then((res) => {
                setAparelhos(res.data);
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, [idAp, modalIsOpenApAdd]);
    
    async function editCliente() {
        const dadosCli = {
            nome,
            cpf,
            numeroCell,
            numeroRes,
            endereco,
            cidade
        }
    
        await useApi.put(`/editar-cliente/${id}`, dadosCli, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setModalIsOpenCliEdit(false);
                setAction('');
                setError('');
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            })
    };

    async function delCliente() {
        await useApi.delete(`/apagar-cliente/${id}`, { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
            
            navigate('/clientes');
        setAction('');
    };

    async function delAparelho() {
        await useApi.delete(`apagar-aparelhos/${idAp}`, { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        
        setModalIsOpenApPerfil(false);
        setAction('');
        reset();
        setAparelhos(prev => prev.filter(ap => ap.id !== idAp));
    };

    async function prepararFotosParaSalvar(fotos) {
        const fotosExistentes = fotos
            .filter(f => f.uploaded)
            .map(f => f.preview);

        const urlsNovas = await uploadFotosComprimidas(fotos, id);

        return [...fotosExistentes, ...urlsNovas];
    }

    async function uploadFotosComprimidas(fotos, clienteId) {
        const novasFotos = fotos.filter(f => !f.uploaded);

        if (!novasFotos.length) return [];

        const compressedFiles = await Promise.all(
            novasFotos.map(f =>
            imageCompression(f.file, {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1024,
                initialQuality: 0.7,
                useWebWorker: true
            })
            )
        );

        const uploads = compressedFiles.map(async (file, index) => {
            const originalFile = novasFotos[index].file;

            const storageRef = ref(storage, `aparelhos/cliente-${clienteId}/${uuid()}-${originalFile.name}`);

            const snapshot = await uploadBytes(storageRef, file);
            return getDownloadURL(snapshot.ref);
        });

        return Promise.all(uploads);
    }

    async function editAparelho() {
        try {
            setIsSaving(true);
            const pagoBoolean = Boolean(pago);

            const fotosOriginais = aparelho.fotos || [];

            const fotosFinal = await prepararFotosParaSalvar(fotos);

            const fotosRemovidas = fotosOriginais.filter(
                url => !fotosFinal.includes(url)
            );
            
            const dadosCellEdit = {
                modelo,
                descricao,
                valor,
                pago: pagoBoolean,
                situacao,
                observacao,
                fotos: fotosFinal,
                fotosRemovidas
            };

            await useApi.put(`/editar-aparelhos/${idAp}`, dadosCellEdit, { withCredentials: true });
            
            setAparelhos(prev =>
                prev.map(ap =>
                    ap.id === idAp
                    ? {
                        ...ap,
                        modelo,
                        descricao,
                        valor,
                        pago: pagoBoolean,
                        situacao,
                        observacao,
                        fotos: fotosFinal
                        }
                    : ap
                )
            );

            setAparelho(prev => ({
                ...prev,
                modelo,
                descricao,
                valor,
                pago: pagoBoolean,
                situacao,
                observacao,
                fotos: fotosFinal
            }));


            setModalIsOpenApEdit(false);
            setModalIsOpenConfirm(false);
            setAction('');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao editar aparelho');
        } finally {
            setIsSaving(false);
        }
    }

    function reset() {
        setModelo('');
        setDescricao('');
        setObservacao('');
        setValor();
        setSituacao('Na fila');
        setPago(false);
    }

    function formatDate(dataHora) {
        const data = new Date(dataHora);
        return data.toLocaleDateString("pt-br", {
            timeZone: "UTC",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    function formatCPF(cpf) {
        if (cpf) {
            cpf = cpf.replace(/[^\d]/g, "");
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }
    };

    async function logout() {
        const response = await useApi.post('/logout', { withCredentials: true });
        window.location.href = '/login';
        console.log(response.data.message);
    }


    const { loading, user } = useAuth();
    if(loading) return <p>CARREGANDO...</p>;

    return(
        <Flex minH="100vh" bg="gray.100" direction="column" align="center" px={4}>
            <Header user={user} onLogout={logout} />

            <Box w="100%" maxW="1200px" mt={4} mb={6}>
                <Grid
                    templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                    gap={6}
                >

                    <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="xl" boxShadow="lg">
                        <Box mb={8}>
                            <Text fontSize="2xl" fontWeight="bold" mb={4}>Dados do Cliente</Text>

                            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                                {/* Nome */}
                                <Box>
                                    <Text fontSize="sm" color="gray.500">Nome</Text>
                                    <Text fontWeight="medium">{cliente.nome}</Text>
                                </Box>

                                {/* CPF */}
                                <Box>
                                    <Text fontSize="sm" color="gray.500">CPF</Text>
                                    <Text>{formatCPF(cliente.cpf)}</Text>
                                </Box>

                                {/* Celular */}
                                <Box>
                                    <Text fontSize="sm" color="gray.500">Celular</Text>
                                    <Text>{cliente.numeroCell || '-'}</Text>
                                </Box>

                                {/* Telefone */}
                                <Box>
                                    <Text fontSize="sm" color="gray.500">Telefone</Text>
                                    <Text>{cliente.numeroRes || '-'}</Text>
                                </Box>

                                {/* Endereço */}
                                <Box gridColumn={{ base: 'auto', md: '1 / -1' }}>
                                    <Text fontSize="sm" color="gray.500">Endereço</Text>
                                    <Text>{cliente.endereco || '-'}</Text>
                                </Box>

                                {/* Cidade */}
                                <Box>
                                    <Text fontSize="sm" color="gray.500">Cidade</Text>
                                    <Text>{cliente.cidade || '-'}</Text>
                                </Box>
                            </Grid>
                        </Box>

                        <Flex gap={3} justify="space-between" flexWrap="wrap">
                            <Button variant="outline" onClick={() => navigate('/clientes')}>
                                Voltar
                            </Button>
                            
                            <Flex gap={3}>
                                <Button colorScheme='blue' onClick={() => { setNome(cliente.nome); setCpf(cliente.cpf); setNumeroCell(cliente.numeroCell); setNumeroRes(cliente.numeroRes); setEndereco(cliente.endereco); setCidade(cliente.cidade); setModalIsOpenCliEdit(true); }}>
                                    Editar
                                </Button>

                                <Button colorScheme='red' onClick={() => { setModalIsOpenConfirm(true); setAction('delCli'); }}>
                                    Excluir
                                </Button>
                            </Flex>
                        </Flex>
                        
                        <ModalEditCli 
                            modalIsOpenCliEdit={modalIsOpenCliEdit}
                            setModalIsOpenCliEdit={setModalIsOpenCliEdit}
                            nome={nome}
                            setNome={setNome}
                            cpf={cpf}
                            setCpf={setCpf}
                            numeroCell={numeroCell}
                            setNumeroCell={setNumeroCell}
                            numeroRes={numeroRes}
                            setNumeroRes={setNumeroRes}
                            endereco={endereco}
                            setEndereco={setEndereco}
                            cidade={cidade}
                            setCidade={setCidade}
                            setModalIsOpenConfirm={setModalIsOpenConfirm}
                            setAction={setAction}
                            error={error}
                            setError={setError}
                        />
                    </Box>


                    <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="xl" boxShadow="lg">
                        <Flex justify="space-between" align="center" mb={4}>
                            <Text fontSize="xl" fontWeight="bold">
                                Aparelhos
                            </Text>

                            <Button
                                size="sm"
                                leftIcon={<MdAdd />}
                                onClick={() => {
                                    reset();
                                    setError('');
                                    setModalIsOpenApAdd(true);
                                }}
                            >
                                Novo Aparelho
                            </Button>
                        </Flex>

                        <Box maxH="500px" overflowY="auto">
                            {aparelhos.map((aparelho) => (
                                <Box
                                    key={aparelho.id}
                                    mb={3}
                                    p={4}
                                    bg="gray.50"
                                    borderRadius="md"
                                    boxShadow="sm"
                                    _hover={{ boxShadow: 'md', bg: 'gray.100' }}
                                    cursor="pointer"
                                    onClick={() => {
                                        setAparelho(aparelho);
                                        setIdAp(aparelho.id);
                                        setPago(Boolean(aparelho.pago));
                                        setModalIsOpenApPerfil(true);
                                    }}
                                >
                                    <Grid
                                        templateColumns={{ base: '1fr', md: '3fr 1fr auto' }}
                                        gap={4}
                                        alignItems="center"
                                    >
                                        <Box>
                                            <Text fontWeight="medium" noOfLines={1}>
                                                {aparelho.modelo}
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {formatDate(aparelho.created_at)}
                                            </Text>
                                        </Box>

                                        <Text
                                            display={{ base: 'none', md: 'block' }}
                                            fontSize="sm"
                                            color="gray.600"
                                        >
                                            {aparelho.situacao}
                                        </Text>

                                        <Text as={'span'} display={{ base: 'none', md: 'block' }} >
                                            Pago:{' '}
                                            <Text as="span" color={aparelho.pago ? 'green.600' : 'red.500'}>{aparelho.pago ? 'Sim' : 'Não'}</Text>
                                        </Text>
                                    </Grid>
                                </Box>
                            ))}
                        </Box>
                    
                        <ModalApAdd
                            isOpen={modalIsOpenApAdd}
                            onClose={() => setModalIsOpenApAdd(false)}
                            modelo={modelo}
                            setModelo={setModelo}
                            descricao={descricao}
                            setDescricao={setDescricao}
                            valor={valor}
                            setValor={setValor}
                            pago={pago}
                            setPago={setPago}
                            situacao={situacao}
                            setSituacao={setSituacao}
                            observacao={observacao}
                            setObservacao={setObservacao}
                            id={id}
                            reset={reset}
                            error={error}
                            setError={setError}
                            setAparelhos={setAparelhos}
                        />
                        {aparelho ? 
                        <ModalApPerfil
                            isOpen={modalIsOpenApPerfil}
                            onClose={() => setModalIsOpenApPerfil(false)}
                            aparelho={aparelho}
                            setModelo={setModelo}
                            setValor={setValor}
                            setPago={setPago}
                            setSituacao={setSituacao}
                            setDescricao={setDescricao}
                            setObservacao={setObservacao}
                            setFotos={setFotos}
                            setAction={setAction}
                            setModalIsOpenApEdit={setModalIsOpenApEdit}
                            setModalIsOpenConfirm={setModalIsOpenConfirm}
                            cliente={cliente}
                        />
                        : <p/>}
                        <ModalApEdit
                            isOpen={modalIsOpenApEdit}
                            onClose={() => setModalIsOpenApEdit(false)}
                            modelo={modelo}
                            setModelo={setModelo}
                            descricao={descricao}
                            setDescricao={setDescricao}
                            valor={valor}
                            setValor={setValor}
                            pago={pago}
                            setPago={setPago}
                            situacao={situacao}
                            setSituacao={setSituacao}
                            observacao={observacao}
                            setObservacao={setObservacao}
                            fotos={fotos}
                            setFotos={setFotos}
                            setModalIsOpenConfirm={setModalIsOpenConfirm}
                            setAction={setAction}
                            error={error}
                            setError={setError}
                            isSaving={isSaving}
                        />
                        <ModalConfirm
                            isOpen={modalIsOpenConfirm}
                            onClose={() => setModalIsOpenConfirm(false)}
                            action={action}
                            editCliente={editCliente}
                            delCliente={delCliente}
                            editAparelho={editAparelho}
                            delAparelho={delAparelho}
                        />
                    </Box>
                </Grid>
            </Box>
        </Flex>
    );
}

// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default Perfil;
