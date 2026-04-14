import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import InternProfile from './index';

// Set up the global theme
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <InternProfile />
    </ChakraProvider>
  );
}