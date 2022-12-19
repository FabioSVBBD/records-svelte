<script>
  import { onMount } from 'svelte'
  import Router, { push } from 'svelte-spa-router'
  import wrap from 'svelte-spa-router/wrap'
  import { client, isAuthenticated, user } from '$/stores'
  import { auth } from '$/services'
  import { Home, NotFound, Transactions } from '$/pages'
  import './app.css'

  const initializeClient = async () => {
    $client = await auth.createClient()

    $isAuthenticated = await $client.isAuthenticated()
    $user = await $client.getUser()
  }

  onMount(initializeClient)

  const routes = {
    '/': Home,
    '/transactions': wrap({
      component: Transactions,
      conditions: [
        async () => {
          await initializeClient()

          return $isAuthenticated
        },
      ],
    }),
    '*': NotFound,
  }
</script>

<main>
  <Router {routes} on:conditionsFailed={() => push('/')} />
</main>

<style>
  main {
    @apply flex flex-col items-center;
  }
</style>
