<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { zarFormat } from '$/utils'
  import { bin, pencil } from '@assets/icons'
  import { clickOutside } from '$/directives'
  import { BallLoader, Glass, Select } from '$/components'

  export let editing = false
  export let type = 'Deposit'
  export let amount
  export let date
  export let description

  let removing = false
  let show = false

  let snapshot

  const dispatch = new createEventDispatcher()

  const save = () => {
    editing = false
    show = false

    dispatch('save', {
      type,
      amount,
      date,
      description,
    })

    editing = false
  }

  const remove = () => {
    removing = true
    dispatch('remove')
  }

  const closed = () => {
    editing = false
    show = false

    if (snapshot) {
      type = snapshot.type
      amount = snapshot.amount
      date = snapshot.date
      description = snapshot.description
    }
  }

  const setShowing = () => (show = true)
  const setEditing = () => {
    editing = true

    snapshot = {
      type,
      amount,
      date,
      description,
    }
  }

  const typeOptions = ['Deposit', 'Withdrawal']

  $: formattedAmount = `${type === 'Deposit' ? '+' : '-'} ${zarFormat.format(amount)}`
</script>

<article use:clickOutside on:click_outside={() => (show = false)}>
  {#if show && !editing}
    <Glass>
      {#if removing}
        <BallLoader />
      {:else}
        <img src={pencil} alt="edit" on:click={setEditing} on:keydown={setEditing} />
        <img src={bin} alt="remove" class="second" on:click={remove} on:keydown={remove} />
      {/if}
    </Glass>
  {/if}

  <section on:click={setShowing} on:keydown={setShowing}>
    {#if editing}
      <Select bind:value={type} options={typeOptions} secondary />

      <input in:fade class="text-xl" bind:value={amount} type="number" />
      <input in:fade class="text-right" bind:value={date} type="datetime-local" />
      <input in:fade class="col-span-2" bind:value={description} type="text" />

      <button type="button" on:click|stopPropagation={closed}>cancel</button>
      <button type="button" on:click|stopPropagation={save}>save</button>
    {:else}
      <p in:fade class="text-xl">{formattedAmount}</p>
      <p in:fade class="text-right">{new Date(date).toDateString()}</p>
      <p in:fade class="col-span-2 text-black/75">{description}</p>
    {/if}
  </section>
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

    padding: 0.5rem;

    text-align: left;
    font-weight: 600;
    color: rgb(0 0 0 / 0.8);

    border-radius: 0.375rem;
    background-color: rgb(255 255 255 / 0.5);

    @apply transition-all shadow-md;
  }

  input {
    padding: 0.1rem 0.4rem;
    background-color: rgb(0 0 0 / 0.1);
    @apply rounded-sm;
  }

  button {
    background: rgb(255 255 255 / 0.1);
    @apply rounded-md;
  }

  img {
    width: 25px;
    right: 0;
    top: 1rem;
    cursor: pointer;
  }

  img.second {
    top: 2.8rem;
  }
</style>
