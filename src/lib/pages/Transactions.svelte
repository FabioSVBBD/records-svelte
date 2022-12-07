<script>
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { v4 as uuid } from 'uuid'
  import { transactions } from '$/stores'
  import { Transaction, IconButton, Loader } from '$/components'
  import { add } from '@assets/icons'
  import { getTransactions } from '$/services'
  import { thumbsDown } from '@assets/animations'
  import Animation from '$/components/Animation.svelte'

  const promise = (async () => {
    $transactions = await getTransactions()
    return $transactions
  })()

  const update = (index, transaction) => ($transactions[index] = transaction.detail)

  const remove = i => ($transactions = [...$transactions.slice(0, i), ...$transactions.slice(i + 1)])

  const addTransaction = () =>
    ($transactions = [
      ...$transactions.map(t => ({
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

<article>
  {#await promise}
    <Loader />
  {:then}
    <section>
      {#each $transactions as { type, amount, date, description, editing, id }, i (id)}
        <div animate:flip={{ duration: 250 }} in:fly={{ y: -10, duration: 50 }} out:fade>
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

<style>
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
    width: min(30rem, 90%);
  }

  p {
    text-align: center;
    font-size: 1rem;
  }

  strong {
    font-size: 1.2rem;
  }
</style>
