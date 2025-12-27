import { Flex, Box, Image, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import imgHomecell from '../utils/logo.png';

const Header = ({ user, onLogout }) => {
  return (
    <Flex w="100%" minH="64px" px={{ base: 4, md: 6 }} align="center">
      {/* Coluna esquerda (reserva de espaço) */}
      <Box flex="1" />

      {/* Logo central */}
      <Flex flex="1" justify="center">
        <Link to="/clientes">
          <Image
            src={imgHomecell}
            alt="Homecell"
            w={{ base: '150px', md: '220px' }}
            cursor="pointer"
            userSelect="none"
          />
        </Link>
      </Flex>

      {/* Usuário + logout */}
      <Flex
        flex="1"
        justify="flex-end"
        align="center"
        gap={4}
      >
        <Text fontSize="md" display={{ base: 'none', md: 'block' }} color="gray.600">
          Olá, <strong>{user}</strong>
        </Text>

        <Button
          size="sm"
          variant="outline"
          colorScheme="red"
          px={{ base: 5, md: 7 }}
          py={{ base: 3, md: 5 }}
          onClick={onLogout}
        >
          Sair
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
