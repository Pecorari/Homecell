import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Button, Input, Text, Image, Stack } from '@chakra-ui/react';
import { MdArrowForward, MdArrowBackIosNew } from 'react-icons/md';
import useApi from '../../hooks/useApi';
import imgHomecell from '../../utils/logo.png';

const Login = () => {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function submit() {
    if (!codigo) return setError('Campo vazio!');
    
    try {
      const response = await useApi.post('/login', { codigo }, { withCredentials: true });
      setError('');
      navigate('/clientes');
      console.log(response.data.message);
    } catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
  }

  return(
    <Flex minH="100dvh" bg="gray.100" align="center" justify="center" direction={{ base: 'column', md: 'row' }} gap={8} px={4}>
      <Button
        position="absolute"
        top={4} left={4} leftIcon={<MdArrowBackIosNew />}
        variant="outline" colorScheme="green"
        onClick={() => navigate('/')}
      >
        Voltar
      </Button>

      <Image src={imgHomecell} alt="Homecell" w={{ base: '200px', md: '350px' }} />

      <Box bg="white" p={{ base: 6, md: 8 }} borderRadius="xl" w={{ base: '100%', sm: '400px', md: '450px' }} boxShadow="lg">
        <Stack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">Login</Text>

          <Input
            placeholder="Digite o código"
            type="password"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />

          {error && (
            <Text color="red.500" fontSize="sm">{error}</Text>
          )}

          <Button rightIcon={<MdArrowForward />} colorScheme="green" onClick={submit}>
            Acessar
          </Button>
        </Stack>
      </Box>

      <Text position="absolute" bottom={4} fontSize="sm" color="gray.500" textAlign="center">
        Desenvolvido por{' '}<a href="https://github.com/Pecorari" target="_blank" rel="noreferrer">Thiago Pecorari Clemente</a> | Sistema de controle v2.0
      </Text>
    </Flex>
  );
}

// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
export default Login;
