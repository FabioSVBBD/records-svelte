<script>
  import Button from './lib/Button.svelte'
  import EditableTransaction from './lib/EditableTransaction.svelte'
  import './app.css'

  const transactions = [
    {
      type: 'Withdrawal',
      amount: 100,
      date: new Date(2022, 1, 2),
      description: 'An absolute mad man was born',
      editing: false,
    },
    {
      type: 'Deposit',
      amount: 100,
      date: new Date(2022, 3, 2),
      description: 'An absolute mad man was born',
      editing: false,
    },
    {
      type: 'Deposit',
      amount: 100,
      date: new Date(2022, 12, 2),
      description: 'An absolute mad man was born',
      editing: false,
    },
  ]

  const updateReceived = (index, transaction) => (transactions[index] = transaction.detail)
</script>

<main>
  <h1>Welcome! View and edit your records here</h1>

  <article>
    <Button tier="primary">Add new</Button>

    {#each transactions as { type, amount, date, description, editing }, i (`${date} - ${description}`)}
      <EditableTransaction
        on:updated={event => updateReceived(i, event)}
        {type}
        {amount}
        {date}
        {description}
        {editing}
      />
    {/each}
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
    width: min(28rem, 90%);
  }
</style>
