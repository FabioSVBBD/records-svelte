import { get, writable } from 'svelte/store'
import { user } from './auth0'
import { deleteTransaction, getTransactions, postTransaction, putTransaction } from '$/services'
import { v4 as uuid } from 'uuid'

export const transactions = writable([])

export const fetchTransactions = async ({ year, month, day }) => {
  const { email } = get(user)

  if (email) {
    const response = await getTransactions(email, { year, month, day })

    transactions.set(response)
  }

  return get(transactions)
}

export const updateTransaction = (index, transaction) => {
  const { email } = get(user)
  const currentTransactions = get(transactions)

  const updatedTransaction = {
    ...transaction.detail,
    id: currentTransactions[index].id,
  }

  if (!Object.is(currentTransactions[index], updatedTransaction)) {
    currentTransactions[index] = updatedTransaction

    transactions.set(currentTransactions)

    putTransaction(email, updatedTransaction)
  }
}

export const removeTransaction = async id => {
  const { email } = get(user)
  const currentTransactions = get(transactions)

  const response = await deleteTransaction(email, id)

  if (response) {
    transactions.set(currentTransactions.filter(transaction => transaction.id !== id))
  }
}

export const addTransaction = async () => {
  const { email } = get(user)
  const currentTransactions = get(transactions)

  const newTransaction = {
    type: 'Deposit',
    amount: 0,
    date: new Date(),
    description: '',
    editing: true,
    id: uuid(),
  }

  const [transaction] = await postTransaction(email, newTransaction)

  newTransaction.id = transaction.id

  transactions.set([
    ...currentTransactions.map(t => ({
      ...t,
      editing: false,
    })),
    newTransaction,
  ])
}
