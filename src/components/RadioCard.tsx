import { Box, useRadio } from '@chakra-ui/react'

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        p={1}
        cursor="pointer"
        borderRadius="sm"
        boxShadow="0 1px 1px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.6);"
        userSelect="none"
        fontWeight="semibold"
        color="gray.700"
        textTransform="uppercase"
        _checked={{
          bg: 'gray.50',
          color: 'gray.700',
          borderColor: 'gray.600',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
