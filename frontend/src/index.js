import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App';
import './index.css';
import theme from './theme';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
