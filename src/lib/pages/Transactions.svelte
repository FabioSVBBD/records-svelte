<script>
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { addTransaction, fetchTransactions, removeTransaction, transactions, updateTransaction, user } from '$/stores'
  import { Transaction, IconButton, Loader, Page, Animation, Select } from '$/components'
  import { thumbsDown } from '@assets/animations'
  import { add, castle } from '@assets/icons'
  import { days, months, years } from '$/utils'

  const DEFAULT = 'any'

  let year = new Date().getUTCFullYear()
  let month = months.find(m => m.value === new Date().getMonth() + 1)
  let day = DEFAULT

  let promise

  $: {
    promise = fetchTransactions({ year, month: month.value, day })
  }
</script>

<header>
  <h1>{$user.given_name}</h1>
  <img src={castle} alt="profile" class="h-8 sm:h-16" />
</header>

<Page>
  <div class="flex flex-col sm:flex-row w-full justify-between items-center my-8 gap-x-2 gap-y-1">
    <Select bind:value={year} options={years} defaultOption={DEFAULT} />
    <Select bind:value={month} options={months} defaultOption={DEFAULT} />
    <Select bind:value={day} options={days(month?.value || 0)} defaultOption={DEFAULT} />
  </div>

  <article out:fly={{ duration: 1 }}>
    {#await promise}
      <Loader />
    {:then}
      <section>
        {#each $transactions as { type, amount, date, description, editing, id }, i (id)}
          <div animate:flip={{ duration: 250 }} in:fly|local={{ y: -10, duration: 50 }} out:fade|local>
            <Transaction
              on:save={event => updateTransaction(i, event)}
              on:remove={() => removeTransaction(i)}
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
    @apply mb-8 flex justify-between items-center;
    text-align: center;

    width: 100%;
    background: rgb(255 255 255 / 0.2);
    padding: 0.4rem 1rem;
  }

  header img {
    border-radius: 50%;
  }

  h1 {
    @apply text-3xl font-semibold;
  }

  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
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
