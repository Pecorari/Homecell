import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.700',
      },
    },
  },

  fonts: {
    heading: `'Inter', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`,
  },

  colors: {
    homecell: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50',
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20',
    },
  },

  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
        fontWeight: 'medium',
      },
      defaultProps: {
        colorScheme: 'homecell',
        variant: 'solid',
      },
      variants: {
        solid: {
            bg: 'homecell.600',
            color: 'white',
            _hover: {
                bg: 'homecell.700',
            },
            _active: {
                bg: 'homecell.800',
            },
        },
        },
    },

    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
        },
      },
      defaultProps: {
        focusBorderColor: 'homecell.600',
      },
    },

    Box: {
      baseStyle: {
        borderRadius: 'md',
      },
    },
  },
});

export default theme;
