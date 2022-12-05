<script>
  import { zarFormat } from '../utils/formatting'

  export let type = 'Deposit'
  export let amount
  export let date
  export let description

  $: formattedAmount = `${type === 'Deposit' ? '+' : '-'} ${zarFormat.format(amount)}`
</script>

<section>
  <p class="text-xl">{formattedAmount}</p>
  <p class="text-right">{new Date(date).toLocaleString()}</p>
  <p class="col-span-2 text-black/75">{description}</p>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.5rem;

    margin: 0.5rem 0;
    padding: 0.5rem 1rem;

    text-align: left;
    font-weight: 600;
    color: rgb(0 0 0 / 0.8);

    border-radius: 0.375rem;
    background-color: rgb(255 255 255 / 0.5);

    @apply transition-all shadow-md;
  }
</style>
