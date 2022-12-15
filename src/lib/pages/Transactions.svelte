<script>
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { v4 as uuid } from 'uuid'
  import { transactions, user } from '$/stores'
  import { getTransactions, postTransaction, putTransaction } from '$/services'
  import { Transaction, IconButton, Loader, Page, Animation } from '$/components'
  import { thumbsDown } from '@assets/animations'
  import { add } from '@assets/icons'

  const fetchTransactions = () => {
    user.subscribe(async u => {
      if ($user.email) {
        $transactions = await getTransactions(u.email)
      }
    })

    return $transactions
  }

  const promise = fetchTransactions()

  const update = (index, transaction) => {
    const updatedTransaction = {
      ...transaction.detail,
      id: $transactions[index].id,
    }

    if (!Object.is($transactions[index], updatedTransaction)) {
      $transactions[index] = updatedTransaction

      putTransaction($user.email, updatedTransaction)
    }
  }

  const remove = i => ($transactions = [...$transactions.slice(0, i), ...$transactions.slice(i + 1)])

  const addTransaction = async () => {
    const newTransaction = {
      type: 'Deposit',
      amount: 0,
      date: new Date(),
      description: '',
      editing: true,
      id: uuid(),
    }

    const [transaction] = await postTransaction($user.email, newTransaction)

    newTransaction.id = transaction.id

    $transactions = [
      ...$transactions.map(t => ({
        ...t,
        editing: false,
      })),
      newTransaction,
    ]
  }
</script>

<Page>
  <header>
    <h1>Welcome!</h1>
    <h2>You can view and edit your transactions here</h2>
  </header>

  <article out:fly={{ duration: 1 }}>
    {#await promise}
      <Loader />
    {:then}
      <section>
        {#each $transactions as { type, amount, date, description, editing, id }, i (id)}
          <div animate:flip={{ duration: 250 }} in:fly|local={{ y: -10, duration: 50 }} out:fade|local>
            <Transaction
              on:save={event => update(i, event)}
              on:remove={() => remove(i)}
              {type}
              {amount}
              {date}
              {description}
              {editing}
            />
          </div>
        {/each}

        <IconButton src={add} alt="add" on:click={addTransaction} on:keydown={addTransaction} className="mt-2" />
      </section>
    {:catch}
      <Animation src={thumbsDown} />
      <p>
        Could not get your transactions. <br />
        <strong>Are you experiencing network problems?</strong>
      </p>
    {/await}
  </article>
</Page>

<style>
  header {
    @apply mb-8;
    text-align: center;
  }

  h1 {
    @apply text-3xl font-semibold;
  }

  h2 {
    @apply text-lg;
  }

  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    width: min(34rem, 100%);
  }

  p {
    text-align: center;
    font-size: 1rem;
  }

  strong {
    font-size: 1.2rem;
  }
</style>
