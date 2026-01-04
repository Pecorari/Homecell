import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Box, Text, Image, Button, Input, Stack, HStack, Grid } from '@chakra-ui/react';
import { MdArrowForward, MdPersonAddAlt } from 'react-icons/md';
import Header from '../../components/Header';
import loadingImg from '../../utils/loadingImg.webp';
import useAuth from '../../utils/useAuth';
import useApi from '../../hooks/useApi';

const Clientes = () => {
    const [valueSearch, setValueSearch] = useState('');
    const [clientesSearched, setClientesSearched] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [page, setPage] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    const loadingRef = useRef(null);
    const navigate = useNavigate();

    const fetchClientes = useCallback(async () => {
        if (isSearching) return;

        try {
            const response = await useApi.get(`/clientes/20/${page}`, { withCredentials: true });
            setClientes((prevClientes) => {
                const newClientes = response.data.filter(cliente => 
                    !prevClientes.some(prev => prev.id === cliente.id)
                )
                return [...prevClientes, ...newClientes]});
        } catch (err) {
            console.log('Erro ao buscar clientes:', err);
        }
    }, [page, isSearching]);

    useEffect(() => {
        if (!isSearching) {
            fetchClientes();
        }
// eslint-disable-next-line
    }, [page, isSearching]);

useEffect(() => {
    if (!loadingRef.current) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
        if(entries.some((entry) => entry.isIntersecting)) {
            setPage((p) => p + 10);
        }
    });
    intersectionObserver.observe(loadingRef.current);

    return () => intersectionObserver.disconnect();
// eslint-disable-next-line
}, [loadingRef.current]);

    function formatCPF(cpf) {
        if (!cpf) return '';
        return cpf.replace(/[^\d]/g, "").padStart(11, '0')
                  .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    async function searchCliente() {
        try {
            if (valueSearch === '') {
                setIsSearching(false);
                setClientesSearched([]);
                setPage(0);
                fetchClientes();
                return;
            }

            setIsSearching(true);
            setClientes([]);
            setPage(0);

            if (valueSearch.length === 11 && parseInt(valueSearch)) {
                const res = await useApi.get(`/clientes-search?value=${formatCPF(valueSearch)}`, { withCredentials: true });

                if (Array.isArray(res.data) && res.data.length > 0) {
                    setClientesSearched(res.data);
                } else setClientesSearched([])
                return;
            } else {
                const res = await useApi.get(`/clientes-search?value=${valueSearch}`, { withCredentials: true });

                if (Array.isArray(res.data) && res.data.length > 0) {
                    setClientesSearched(res.data);
                } else setClientesSearched([])
            }
        } catch (err) {
            console.log(err.response.data.message);
            setClientesSearched([]);
        }
    };

    function submit(e) {
        e.preventDefault();
        searchCliente();
    }

    function goCadCli() {
        if(clientesSearched.length === 0 && valueSearch !== '') {
            navigate('/cadastrar-cliente', { state: { valueSearch } });
            return;
        } else {
            navigate('/cadastrar-cliente');
            return;
        }
    }

    async function logout() {
        const response = await useApi.post('/logout', { withCredentials: true });
        window.location.href = '/login';
        console.log(response.data.message);
    }

    const { loading, user } = useAuth();
    if(loading) return <Text>CARREGANDO...</Text>

    return(
        <Flex minH="100dvh" direction="column" bg="gray.100">
            <Header user={user} onLogout={logout} />

            <Flex flex="1" justify="center" px={4} py={6}>
                <Box bg="white" w="100%" maxW="700px" maxH="calc(100dvh - 250px)" minH={620} p={6} borderRadius="xl" boxShadow="lg" display="flex" flexDirection="column">
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        Clientes
                    </Text>

                    {/* Busca */}
                    <Stack spacing={4} mb={4}>
                        <HStack spacing={3}>
                            <Input
                                placeholder="Buscar"
                                value={valueSearch}
                                onChange={(e) => setValueSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && submit(e)}
                            />

                            <Button fontSize={{ base: 12, md: 14 }} rightIcon={<MdArrowForward />} px={6} variant="outline" onClick={submit}>Pesquisar</Button>
                        </HStack>

                        <Button fontSize={{ base: 12, md: 14 }} rightIcon={<MdPersonAddAlt />} alignSelf="flex-start" w="100%" onClick={goCadCli}>Adicionar</Button>
                    </Stack>

                    {/* Cabeçalho da lista */}
                    <Grid templateColumns="auto 1fr auto" fontSize="sm" color="gray.500" px={4} mb={2} gap={14}>
                        <Text>ID</Text>
                        <Text textAlign="left">Nome / CPF</Text>
                        <Text display={{ base: 'none', md: 'block' }}>Aparelhos</Text>
                    </Grid>

                    {/* Lista */}
                    <Box flex="1" overflowY="auto" pr={2} css={{ scrollbarWidth: 'none' }}>
                        {(clientesSearched.length > 0 ? clientesSearched : clientes).map(
                            (cliente) => (
                                <Link key={cliente.id} to={`/clientes/${cliente.id}`}>
                                    <Flex
                                        p={4}
                                        mb={2}
                                        borderRadius="md"
                                        borderBottomWidth="2px"
                                        borderBottomColor="gray.100"
                                        _hover={{ boxShadow: 'md', bg: 'gray.50' }}
                                        align="center"
                                    >
                                        <Grid
                                            w="100%"
                                            templateColumns={{ base: 'auto 1fr', md: 'auto 1fr 25px' }}
                                            alignItems="center"
                                            gap={10}
                                        >
                                            {/* ID */}
                                            <Text fontWeight="medium">
                                                {cliente.id}
                                            </Text>

                                            {/* Nome / CPF */}
                                            <Box textAlign="left">
                                                <Text fontWeight="medium" noOfLines={1}>
                                                    {cliente.nome}
                                                </Text>
                                                <Text fontSize="sm" color="gray.500">
                                                    {cliente.cpf ? formatCPF(cliente.cpf) : '000.000.000-00'}
                                                </Text>
                                            </Box>

                                            {/* Aparelhos */}
                                            <Text fontWeight="medium" textAlign="left" display={{ base: 'none', md: 'block' }}>
                                                {cliente.total_aparelhos}
                                            </Text>
                                        </Grid>
                                    </Flex>
                                </Link>
                            )
                        )}

                        {(clientes.length > 0 || clientesSearched.length > 0) && (
                            <Box ref={loadingRef} textAlign="center" py={4}>
                                <Image src={loadingImg} w="28px" mx="auto" />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
}

// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default Clientes;
