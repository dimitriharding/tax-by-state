import React from 'react'
import { useForm } from 'react-hook-form'
import * as currencyFormatter from 'currency-formatter'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Container,
  VStack,
  Select,
  Box,
  Center,
  HStack,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  useRadioGroup,
  chakra,
} from '@chakra-ui/react'

import stateTaxes from '../data/stateTaxes'

import { calculateTax } from '../util/calculator'
import Display from '../components/Display'
import Header from '../components/Header'
import RadioCard from '../components/RadioCard'
import Footer from '../components/Footer'

const Calculator = chakra(Box)

function Home() {
  const [currentState, setCurrentState] = React.useState(null)
  const { errors, register } = useForm()
  const [radioValue, setRadioValue] = React.useState<React.ReactText>('single')
  const [itemCost, setItemCost] = React.useState()
  const [numberOfItems, setNumberOfItems] = React.useState()

  const onlyNumbers = (value) => value.replace(/[^0-9]/g, '')

  const handleChange = (event) => {
    const index = event.target.value
    setCurrentState(index)
  }

  const handleCostChange = (event) =>
    setItemCost(onlyNumbers(event.target.value))

  const handleNumberOfItems = (event) =>
    setNumberOfItems(onlyNumbers(event.target.value))

  const options = [
    { name: 'Only one', value: 'single' },
    { name: 'Multiple Items', value: 'multiple' },
  ]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'numberOfItems',
    defaultValue: 'single',
    onChange: setRadioValue,
  })

  const group = getRootProps()

  function validateItems(items) {
    if (!items) return 'Number of items is required'
    if (isNaN(items)) return 'Number of items should be a number'
    if (items === '0') return 'Number of items should be more than 0'
    return true
  }

  function validateState(state) {
    if (!state) {
      return 'State is required'
    } else return true
  }

  function validateCost(value) {
    if (!value) {
      return 'Cost is required'
    } else if (isNaN(value)) {
      return 'Cost should be a number'
    } else {
      return true
    }
  }

  return (
    <Container backgroundImage="url('/img/background-image.png')">
      <VStack my={24} spacing={12}>
        <Calculator
          bg="teal.500"
          w="80%"
          p="20px"
          boxShadow="calculator"
          rounded="md"
          id="calculator"
          textRendering="geometricPrecision"
        >
          <Header>Calculate Tax by State</Header>
          <Display
            operations={
              currentState
                ? `in ${stateTaxes[currentState].name} @ ${
                    stateTaxes[currentState].tax
                  }% ${
                    itemCost
                      ? `for ${currencyFormatter.format(itemCost, {
                          code: 'USD',
                        })}`
                      : ''
                  } ${
                    numberOfItems && itemCost && radioValue === 'multiple'
                      ? ` X ${numberOfItems}`
                      : ''
                  }`
                : ''
            }
            tax={calculateTax({
              cost: itemCost,
              state: currentState,
              items: radioValue === 'multiple' ? numberOfItems : undefined,
            })}
          />
          <form>
            <FormControl color="white" mt={2} isInvalid={errors.state}>
              <Select
                ref={register({ validate: validateState })}
                name="state"
                onChange={handleChange}
                placeholder="Select a state"
                border="none"
                fontWeight="semibold"
                _focus={{ color: 'currentcolor' }}
                fontSize="2em"
              >
                {stateTaxes.map((state, index) => (
                  <option key={state.name} value={index}>
                    {state.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.state && errors.state.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={0} color="white" mt={2} isInvalid={errors.cost}>
              {itemCost && <FormLabel ml={5}>Item cost</FormLabel>}
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="2em"
                  ml={1}
                >
                  $
                </InputLeftElement>
                <Input
                  bg="transparent"
                  name="cost"
                  onChange={handleCostChange}
                  placeholder="Item cost"
                  value={itemCost}
                  ref={register({ validate: validateCost })}
                  border="none"
                  fontSize="2em"
                  _focus={{
                    color: 'currentcolor',
                  }}
                  _placeholder={{
                    color: 'gray.300',
                  }}
                  backgroundColor="transparent"
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.cost && errors.cost.message}
              </FormErrorMessage>
            </FormControl>
            {radioValue === 'multiple' && (
              <FormControl
                mb={0}
                color="white"
                mt={2}
                ml={2}
                isInvalid={errors.items}
              >
                {numberOfItems && <FormLabel ml={4}>Number of items</FormLabel>}
                <InputGroup size="lg">
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="2em"
                  >
                    #
                  </InputLeftElement>
                  <Input
                    name="items"
                    value={numberOfItems}
                    onChange={handleNumberOfItems}
                    placeholder="Number of items"
                    ref={register({ validate: validateItems })}
                    border="none"
                    fontSize="2em"
                    bg="transparent"
                    _focus={{ color: 'currentcolor' }}
                    _active={{
                      color: 'currentcolor',
                    }}
                    _placeholder={{
                      color: 'gray.300',
                    }}
                    backgroundColor="transparent"
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.items && errors.items.message}
                </FormErrorMessage>
              </FormControl>
            )}
            <FormControl pl={5} mt={5} as="fieldset">
              <Center>
                <HStack {...group}>
                  {options.map(({ value, name }) => {
                    const radio = getRadioProps({ value })
                    return (
                      <RadioCard key={value} {...radio}>
                        {name}
                      </RadioCard>
                    )
                  })}
                </HStack>
              </Center>
              <Center>
                <FormHelperText color="gray.300">
                  Indicate the number of items
                </FormHelperText>
              </Center>
            </FormControl>
            <Center></Center>
          </form>
        </Calculator>
      </VStack>
      <Footer />
    </Container>
  )
}

export default Home
