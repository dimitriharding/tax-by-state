import { Box } from '@chakra-ui/react'

const Header = ({ children, ...rest }) => (
  <Box
    {...rest}
    userSelect="none"
    textShadow="0 1px 1px rgba(255,255,255,0.15);"
    textAlign="right"
    mt="-8px"
    pb="8px"
    fontWeight="bold"
    textTransform="uppercase"
    letterSpacing="2px"
    color="gray.600"
  >
    {children}
  </Box>
)

export default Header
