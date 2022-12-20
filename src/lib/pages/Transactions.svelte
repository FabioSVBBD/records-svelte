<script>
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { addTransaction, fetchTransactions, removeTransaction, transactions, updateTransaction } from '$/stores'
  import { Transaction, IconButton, Loader, Page, Animation, Select, SubHeading, Header } from '$/components'
  import { thumbsDown } from '@assets/animations'
  import { add } from '@assets/icons'
  import { days, months, years } from '$/utils'
  import Heading from '$/components/Heading.svelte'

  const DEFAULT = 'any'

  let year = new Date().getUTCFullYear()
  let month = months.find(m => m.value === new Date().getMonth() + 1)
  let day = DEFAULT

  let promise

  $: {
    promise = fetchTransactions({ year, month: month.value, day })
  }
</script>

<Header />

<Heading>Transactions</Heading>

<Page>
  <SubHeading>Filters</SubHeading>
  <div class="flex flex-col sm:flex-row w-full justify-between items-center mb-8 gap-x-2 gap-y-1">
    <Select bind:value={year} options={years} defaultOption={DEFAULT} />
    <Select bind:value={month} options={months} defaultOption={DEFAULT} />
    <Select bind:value={day} options={days(month?.value || 0)} defaultOption={DEFAULT} />
  </div>

  <article out:fly={{ duration: 1 }}>
    {#await promise}
      <Loader />
    {:then}
      <SubHeading>Transactions</SubHeading>
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
    width: 100%;
  }

  p {
    text-align: center;
    font-size: 1rem;
  }

  strong {
    font-size: 1.2rem;
  }
</style>
