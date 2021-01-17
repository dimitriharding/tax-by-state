import { Box, Divider } from '@chakra-ui/react'

const Display = ({ tax, operations, ...rest }) => (
  <Box
    {...rest}
    p={5}
    fontSize="35px"
    textAlign="right"
    borderRadius={2}
    shadow="display"
    background="rgba(0,0,0,.6)"
    id="display"
    fontFamily="'Roboto Condensed', sans-serif;"
  >
    <Box
      id="display-indicate"
      fontSize="10px"
      color="gray.400"
      textAlign="left"
      textTransform="uppercase"
      userSelect="none"
      margin="-5px 0 -2px -5px"
    >
      tax
    </Box>
    <Box color="white" h="38px" id="display-main">
      {tax}
    </Box>
    {operations && <Divider colorScheme="teal" mt={2} />}
    <Box
      color="gray.400"
      fontSize="15px"
      pt="3px"
      mt="4px"
      id="display-operations"
    >
      {operations}
    </Box>
  </Box>
)

export default Display
