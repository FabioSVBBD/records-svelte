<script>
  import { v4 as uuid } from 'uuid'
  import Button from './lib/Button.svelte'
  import EditableTransaction from './lib/EditableTransaction.svelte'
  import IconButton from './lib/IconButton.svelte'

  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  import './app.css'

  let transactions = [
    {
      type: 'Withdrawal',
      amount: 100,
      date: new Date(2022, 1, 2),
      description: '1.An absolute mad man was born',
    },
    {
      type: 'Deposit',
      amount: 100,
      date: new Date(2022, 3, 2),
      description: '2.An absolute mad man was born',
    },
    {
      type: 'Deposit',
      amount: 100,
      date: new Date(2022, 12, 2),
      description: '3.An absolute mad man was born',
    },
  ]

  const updateReceived = (index, transaction) => (transactions[index] = transaction.detail)

  const transactionRemoved = i => (transactions = [...transactions.slice(0, i), ...transactions.slice(i + 1)])

  const transacitonAdded = () =>
    (transactions = [
      ...transactions.map(t => ({
        ...t,
        editing: false,
      })),
      {
        type: 'Deposit',
        amount: 0,
        date: new Date(),
        description: '',
        editing: true,
      },
    ])
</script>

<main>
  <h1>Welcome! View and edit your records here</h1>

  <article>
    <Button tier="primary" on:click={transacitonAdded}>Add new</Button>

    {#each transactions as { type, amount, date, description, editing }, i (uuid())}
      <div animate:flip in:fade out:fly={{ x: 100 }}>
        <EditableTransaction
          on:save={event => updateReceived(i, event)}
          on:remove={() => transactionRemoved(i)}
          {type}
          {amount}
          {date}
          {description}
          {editing}
        />
      </div>
    {/each}

    <IconButton on:click={transacitonAdded} on:keydown={transacitonAdded} />
  </article>
</main>

<style>
  main {
    @apply p-8 flex flex-col items-center;
  }

  h1 {
    @apply text-4xl font-bold mb-16;
  }

  article {
    width: min(30rem, 90%);
  }
</style>
