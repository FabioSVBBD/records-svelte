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
      id: 1,
    },
    {
      type: 'Deposit',
      amount: 100,
      date: new Date(2022, 3, 2),
      description: '2.An absolute mad man was born',
      id: 2,
    },
    {
      type: 'Deposit',
      amount: 100,
      date: new Date(2022, 12, 2),
      description: '3.An absolute mad man was born',
      id: 3,
    },
  ]

  const update = (index, transaction) => (transactions[index] = transaction.detail)

  const remove = i => (transactions = [...transactions.slice(0, i), ...transactions.slice(i + 1)])

  const add = () =>
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
        id: uuid(),
      },
    ])
</script>

<main>
  <h1>Welcome! View and edit your records here</h1>

  <article>
    <Button tier="primary" on:click={add}>Add new</Button>

    {#each transactions as { type, amount, date, description, editing, id }, i (id)}
      <div animate:flip={{ duration: 250 }} in:fly={{ y: -10, duration: 50 }} out:fade>
        <EditableTransaction
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

    <IconButton on:click={add} on:keydown={add} />
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
