<script>
  import { createEventDispatcher } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { zarFormat } from '$/utils'
  import { bin, close, pencil, tick } from '@assets/icons'

  export let editing = false
  export let type = 'Deposit'
  export let amount
  export let date
  export let description

  let show = false
  let _type = type
  let _amount = amount
  let _date = date
  let _description = description

  // @ts-ignore
  const dispatch = new createEventDispatcher()

  const save = () => {
    dispatch('save', {
      type: _type,
      amount: _amount,
      date: _date,
      description: _description,
    })

    editing = false
  }

  const remove = () => dispatch('remove')

  const closed = () => {
    editing = false

    _type = type
    _amount = amount
    _date = date
    _description = description
  }

  const typeOptions = ['Deposit', 'Withdrawal']

  $: formattedAmount = `${_type === 'Deposit' ? '+' : '-'} ${zarFormat.format(_amount)}`
</script>

<article on:mouseenter={() => (show = true)} on:mouseleave={() => (show = false)}>
  <section>
    {#if editing}
      <select in:fade bind:value={_type} class="col-span-2">
        {#each typeOptions as option}
          <option value={option}>
            {option}
          </option>
        {/each}
      </select>

      <input in:fade class="text-xl" bind:value={_amount} type="number" />
      <input in:fade class="text-right" bind:value={_date} type="datetime-local" />
      <input in:fade class="col-span-2" bind:value={_description} type="text" />
    {:else}
      <p in:fade class="text-xl">{formattedAmount}</p>
      <p in:fade class="text-right">{new Date(_date).toDateString()}</p>
      <p in:fade class="col-span-2 text-black/75">{_description}</p>
    {/if}
  </section>

  {#if editing}
    <img
      transition:fly={{ x: -10, duration: 150 }}
      src={close}
      alt="close"
      on:click={closed}
      on:keydown={() => (editing = false)}
    />
    <img transition:fly={{ x: -10, duration: 150 }} src={tick} alt="save" on:click={save} on:keydown={save} />
  {/if}

  {#if show && !editing}
    <img
      transition:fly={{ x: -10, duration: 150 }}
      src={pencil}
      alt="edit"
      on:click={() => (editing = true)}
      on:keydown={() => (editing = true)}
    />
    <img
      transition:fly={{ x: -10, duration: 150 }}
      src={bin}
      alt="remove"
      class="second"
      on:click={remove}
      on:keydown={remove}
    />
  {/if}
</article>

<style>
  article {
    position: relative;
  }

  section {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.5rem;
    column-gap: 0.5rem;

    margin: 0 2rem;
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

  img {
    width: 20px;
    height: 18px;
    position: absolute;
    right: 0;
    top: 1rem;
    cursor: pointer;
  }

  img.second {
    top: 2.8rem;
  }

  img[alt='close'] {
    top: 2.2rem;
  }

  img[alt='save'] {
    top: 4.2rem;
  }
</style>
