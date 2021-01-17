import { Box, Divider, Text, Link } from '@chakra-ui/react'

const Footer = (props) => (
  <Box
    {...props}
    position="fixed"
    left={0}
    bottom={0}
    w="100%"
    textAlign="center"
    mb={2}
  >
    <Divider />
    <Text mt={2} textAlign="center">
      Made in 🇯🇲 by{' '}
      <Link
        href="https://www.dimitriharding.com"
        isExternal
        textDecoration="underline"
      >
        Dimitri Harding
      </Link>{' '}
      &bull;{' '}
      <Link
        href="https://github.com/dimitriharding/tax-by-state"
        isExternal
        textDecoration="underline"
      >
        github/dimitriharding/tax-by-state
      </Link>{' '}
      &bull;{' '}
      <Link
        href="https://twitter.com/irtimid_harding"
        isExternal
        textDecoration="underline"
      >
        @irtimid_harding
      </Link>
    </Text>
  </Box>
)

export default Footer
