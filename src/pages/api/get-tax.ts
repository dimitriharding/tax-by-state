import { NextApiRequest, NextApiResponse } from 'next'
import { calculateTax } from '../../util/calculator'
import { getStateData } from '../../util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json')

  try {
    const { query } = req

    const { cost, items, state } = query

    const stateInfo = await getStateData(state)

    const stateIndex = stateInfo.id
    const costNumber = parseInt(cost as string)
    const itemsNumber = parseInt(items as string)

    res.statusCode = 200
    res.end(
      JSON.stringify({
        success: true,
        ...query,
        taxPercentage: stateInfo.tax,
        calculatedTax: calculateTax({
          cost: costNumber,
          items: itemsNumber,
          state: stateIndex,
        }),
      })
    )
  } catch (error) {
    res.statusCode = 500
    res.end(
      JSON.stringify({
        success: false,
        error: error.message,
      })
    )
  }
}
