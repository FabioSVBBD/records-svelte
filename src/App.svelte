<script>
  import Router from 'svelte-spa-router'
  import { routes } from '$/utils'
  import './app.css'
</script>

<main>
  <Router {routes} />
</main>

<style>
  main {
    @apply flex flex-col items-center;
  }
</style>
