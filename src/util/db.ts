import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.API_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

type IStateInfo = {
  id: number
  state: string
  tax: string
}

export const getStateData = async (state) => {
  const { data, error } = await supabase
    .from('tax-by-states')
    .select('*')
    .eq('state', state)

  if (error) throw error

  return (data[0] as unknown) as IStateInfo
}

export const getData = async (table) => {
  const { data, error } = await supabase.from(table).select('*')

  if (error) throw error

  return data
}

export const addData = async (dataToInsert, table) => {
  const { data, error } = await supabase
    .from(table ? table : 'tax-by-states')
    .insert([...dataToInsert])

  if (error) throw error

  return data
}

export const deleteData = async () => {
  const { data, error } = await supabase.from('tax-by-states').delete()

  if (error) throw error

  return data
}
