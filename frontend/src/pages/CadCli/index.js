import { useEffect } from 'react';
import { useState } from 'react';
import { Flex, Box, Text, Button, Input, Stack, FormControl, FormLabel, } from '@chakra-ui/react';
import { MdArrowForward, MdWest } from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Header from '../../components/Header';
import useApi from '../../hooks/useApi';
import useAuth from '../../utils/useAuth';

const CadCli = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [numeroCell, setNumeroCell] = useState('');
    const [numeroRes, setNumeroRes] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [id, setId] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const valueSearch = location?.state?.valueSearch || '';

    useEffect(() => {
        if(id !== '') {
            navigate('/clientes/' + id);
        }
    }, [id, navigate]);

    useEffect(() => {
        const valueSearchLimpo = valueSearch.replace(/\D/g, '');
        
        if (valueSearchLimpo.length === 11 && !isNaN(valueSearchLimpo)) {
            setCpf(valueSearchLimpo);
        } else if (/[a-zA-Z]/.test(valueSearch)) {
            setNome(valueSearch);
        } else {
            return;
        }
    }, [valueSearch]);

    async function submit() {
        const dados = { nome, cpf, numeroCell, numeroRes, endereco, cidade }
        
        try {
            const resposta = await useApi.post('/cadastrar-cliente', dados, { withCredentials: true });
            setId(resposta.data);
            reset();
            setError('');
        } catch (err) {
            console.log(err.response.data.message)
            setError(err.response.data.message);
        }
    }

    function reset() {
        setNome('');
        setCpf('');
        setNumeroCell('');
        setNumeroRes('');
        setEndereco('');
        setCidade('');
    }

    async function logout() {
        const response = await useApi.post('/logout', { withCredentials: true });
        window.location.href = '/login';
        console.log(response.data.message);
    }

    const { loading, user } = useAuth();
    if(loading) return <Text>CARREGANDO...</Text>;

    return(
        <Flex minH="100dvh" bg="gray.100" direction="column">
            <Header user={user} onLogout={logout} />

            <Flex flex="1" justify="center" px={4} py={6}>
                <Box
                    bg="white"
                    w="100%"
                    maxW="700px"
                    h="100%"
                    maxH="100%"
                    p={6}
                    borderRadius="xl"
                    boxShadow="lg"
                    display="flex"
                    flexDirection="column"
                    overflow="hidden"
                >
                    <Text fontSize="2xl" fontWeight="bold" mb={6}>
                        Cadastrar Cliente
                    </Text>

                    <Stack spacing={{ base: '1', md: '4' }}>
                        <FormControl>
                            <FormLabel>Nome Completo</FormLabel>
                            <Input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome do cliente"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>CPF</FormLabel>
                            <Input
                                as={InputMask}
                                mask="999.999.999-99"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                placeholder="___.___.___-__"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Celular</FormLabel>
                            <Input
                                as={InputMask}
                                mask="(99) 99999-9999"
                                value={numeroCell}
                                onChange={(e) => setNumeroCell(e.target.value)}
                                placeholder="(__) ____-_____"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Telefone Residencial</FormLabel>
                            <Input
                                as={InputMask}
                                mask="(99) 9999-9999"
                                value={numeroRes}
                                onChange={(e) => setNumeroRes(e.target.value)}
                                placeholder="(__) ____-____"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Endereço</FormLabel>
                            <Input
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                placeholder="Endereço do cliente"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Cidade</FormLabel>
                            <Input
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="Cidade do cliente"
                            />
                        </FormControl>
                    </Stack>

                    {error && (
                        <Text color="red.500" mt={4}>{error}</Text>
                    )}

                    <Flex mt={8} justify="space-between" flexWrap="wrap" gap={3}>
                        <Link to="/clientes">
                            <Button variant="outline" leftIcon={<MdWest />}>
                            Voltar
                            </Button>
                        </Link>

                        <Button rightIcon={<MdArrowForward />} onClick={submit}>
                            Cadastrar
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
}

// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default CadCli;
