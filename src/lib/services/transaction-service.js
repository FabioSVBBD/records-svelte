const getTransactions = async () => {
  const res = await fetch('https://localhost:5001/8ac6d140-ca0d-4181-a593-56b5113aca86/transactions')

  if (!res.ok) {
    throw new Error('Transactions call failed')
  }

  const json = await res.json()

  return json.value || []
}

export { getTransactions }
