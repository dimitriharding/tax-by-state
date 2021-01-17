import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: 'teal.500',
        lineHeight: 'base',
      },
    }),
  },
  useSystemColorMode: false,
  initialColorMode: 'dark',
  shadows: {
    display: 'inset 0 5px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.3);',
    calculator:
      '0 4px 40px rgba(0,0,0,0.2), inset 0 3px 0 rgba(255,255,255,0.2);',
  },
}

const customTheme = extendTheme(config)

export default customTheme
