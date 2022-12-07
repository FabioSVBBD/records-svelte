<script>
  import { Transaction } from '$/pages'
  import './app.css'
</script>

<main>
  <h1>Welcome! View and edit your records here</h1>

  <Transaction />
</main>

<style>
  main {
    @apply p-8 flex flex-col items-center;
  }

  h1 {
    @apply text-4xl font-bold mb-16;
  }
</style>
