<script>
  import { fly } from 'svelte/transition'
  import { fetchTransactions } from '$/stores'
  import { Heading, DateFilters, TransactionList, NetworkError, Loader, Page, SubHeading, Header } from '$/components'

  let year, month, day, promise

  $: {
    if (month !== undefined) {
      promise = fetchTransactions({ year, month: month?.value, day })
    }
  }
</script>

<Header />
<Heading>Transactions</Heading>

<Page>
  <SubHeading>Filters</SubHeading>
  <DateFilters bind:year bind:month bind:day />

  <article out:fly={{ duration: 1 }}>
    {#await promise}
      <Loader />
    {:then}
      <SubHeading>Transactions</SubHeading>
      <TransactionList />
    {:catch}
      <NetworkError />
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
</style>
