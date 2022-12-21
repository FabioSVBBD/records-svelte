import { config } from 'src/config'
import { authorizedFetch } from './authorized-fetch'

const { domain } = config

const getTransactions = async (userId, { year, month, day }) => {
  const params = {}
  if (typeof year === 'number') {
    params.year = year
  }

  if (typeof month === 'number') {
    params.month = month
  }

  if (typeof day === 'number') {
    params.day = day
  }

  const urlParams = new URLSearchParams(params).toString()

  const res = await authorizedFetch(`${domain}/${userId}/transactions?${urlParams}`)

  if (!res.ok) {
    throw new Error('/transactions GET failure')
  }

  const json = await res.json()

  return json.value || []
}

const postTransaction = async (userId, transaction) => {
  const res = await authorizedFetch(`${domain}/${userId}/transactions`, {
    method: 'POST',
    body: JSON.stringify([
      {
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
      },
    ]),
  })

  if (!res.ok) {
    throw new Error('/transactions POST failure')
  }

  const json = await res.json()

  return json.value || []
}

const putTransaction = async (userId, transaction) => {
  const res = await authorizedFetch(`${domain}/${userId}/transactions?id=${transaction.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
    }),
  })

  if (!res.ok) {
    throw new Error('/transactions PUT failure')
  }

  const json = await res.json()

  return json.value || []
}

const deleteTransaction = async (userId, id) => {
  const res = await authorizedFetch(`${domain}/${userId}/transactions?id=${id}`, { method: 'DELETE' })

  if (!res.ok) {
    throw new Error('/transactions DELETE failure')
  }

  const json = await res.json()

  return json.value || []
}

export { getTransactions, postTransaction, putTransaction, deleteTransaction }
