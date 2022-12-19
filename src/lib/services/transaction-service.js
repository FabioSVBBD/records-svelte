const domain = 'https://localhost:5001'

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

  const res = await fetch(`${domain}/${userId}/transactions?${urlParams}`)

  if (!res.ok) {
    throw new Error('/transactions GET failure')
  }

  const json = await res.json()

  return json.value || []
}

const postTransaction = async (userId, transaction) => {
  const res = await fetch(`${domain}/${userId}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*' },
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
  const res = await fetch(`${domain}/${userId}/transactions?id=${transaction.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*' },
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

export { getTransactions, postTransaction, putTransaction }
