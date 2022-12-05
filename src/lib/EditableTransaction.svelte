<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { zarFormat } from '../utils/formatting'
  import { clickOutside } from '../directives/click-outside'

  export let editing = false
  export let type = 'Deposit'
  export let amount
  export let date
  export let description

  // @ts-ignore
  const dispatch = new createEventDispatcher()

  const transactionUpdated = () => {
    dispatch('updated', {
      type,
      amount,
      date,
      description,
      editing,
    })
  }

  const typeOptions = ['Deposit', 'Withdrawal']

  const handleClick = inside => {
    if (editing !== inside) editing = inside
  }

  $: formattedAmount = `${type === 'Deposit' ? '+' : '-'} ${zarFormat.format(amount)}`
</script>

<section
  use:clickOutside
  on:click_outside={() => handleClick(false)}
  on:click={() => handleClick(true)}
  on:keydown={() => handleClick(true)}
>
  {#if editing}
    <select in:fade bind:value={type} class="col-span-2" on:blur={transactionUpdated}>
      {#each typeOptions as option}
        <option value={option}>
          {option}
        </option>
      {/each}
    </select>

    <input in:fade class="text-xl" bind:value={amount} type="number" on:blur={transactionUpdated} />
    <input in:fade class="text-right" bind:value={date} type="datetime-local" on:blur={transactionUpdated} />
    <input in:fade class="col-span-2" bind:value={description} type="text" on:blur={transactionUpdated} />
  {:else}
    <p in:fade class="text-xl">{formattedAmount}</p>
    <p in:fade class="text-right">{new Date(date).toDateString()}</p>
    <p in:fade class="col-span-2 text-black/75">{description}</p>
  {/if}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.5rem;
    column-gap: 0.5rem;

    margin: 0.5rem 0;
    padding: 0.5rem;

    text-align: left;
    font-weight: 600;
    color: rgb(0 0 0 / 0.8);

    border-radius: 0.375rem;
    background-color: rgb(255 255 255 / 0.5);

    @apply transition-all shadow-md;
  }

  input,
  select {
    padding: 0.1rem 0.4rem;
    background-color: rgb(0 0 0 / 0.1);
    @apply rounded-sm;
  }
</style>
