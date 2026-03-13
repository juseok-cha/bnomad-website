'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#000000',
        color: '#FFFFFF',
      },
    },
  },
  colors: {
    brand: {
      50: '#FFE8E0',
      100: '#FFC1B0',
      200: '#FF9A80',
      300: '#FF7350',
      400: '#FF4C20',
      500: '#F93F05', // Main highlight color
      600: '#D93604',
      700: '#B92D03',
      800: '#992402',
      900: '#791B02',
    },
    dark: {
      50: '#E6E6E6',
      100: '#CCCCCC',
      200: '#999999',
      300: '#666666',
      400: '#4D4D4D',
      500: '#333333',
      600: '#1A1A1A',
      700: '#0D0D0D',
      800: '#050505',
      900: '#000000',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}
