import statesTax from '../data/stateTaxes'
import * as currencyFormatter from 'currency-formatter'

export const calculateTax = ({
  cost,
  items,
  state,
}: {
  cost: number
  items: number
  state: number
}) => {
  let tax

  if (!state || !cost) return 0

  const percentage = statesTax[state].tax

  if (items) {
    const total = cost * items
    tax = (total / 100) * percentage
    return currencyFormatter.format(tax, { code: 'USD' })
  }

  tax = (cost / 100) * percentage
  return currencyFormatter.format(tax, { code: 'USD' })
}
