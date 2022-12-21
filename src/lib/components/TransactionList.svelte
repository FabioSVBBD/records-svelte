<script>
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { Transaction, IconButton } from '$/components'
  import { transactions, addTransaction, removeTransaction, updateTransaction } from '$/stores'
  import { add } from '@assets/icons'
</script>

<section>
  {#each $transactions as { type, amount, date, description, editing, id }, i (id)}
    <div animate:flip={{ duration: 250 }} in:fly|local={{ y: -10, duration: 50 }} out:fade|local>
      <Transaction
        on:save={event => updateTransaction(i, event)}
        on:remove={() => removeTransaction(id)}
        bind:type
        bind:amount
        bind:date
        bind:description
        bind:editing
      />
    </div>
  {/each}

  <IconButton src={add} alt="add" on:click={addTransaction} on:keydown={addTransaction} className="mt-2" />
</section>

<style>
  section {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;
  }
</style>
