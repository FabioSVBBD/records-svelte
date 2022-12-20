<script>
  import { onMount } from 'svelte'
  import Router, { push } from 'svelte-spa-router'
  import wrap from 'svelte-spa-router/wrap'
  import { client, isAuthenticated, user } from '$/stores'
  import { auth } from '$/services'
  import './app.css'

  const initializeClient = async () => {
    $client = await auth.createClient()

    $isAuthenticated = await $client.isAuthenticated()
    $user = await $client.getUser()
  }

  onMount(initializeClient)

  const routes = {
    '/': wrap({ asyncComponent: () => import('$/pages/Home.svelte') }),
    '/transactions': wrap({
      asyncComponent: () => import('$/pages/Transactions.svelte'),
      conditions: [
        async () => {
          await initializeClient()

          return $isAuthenticated
        },
      ],
    }),
    '*': wrap({ asyncComponent: () => import('$/pages/NotFound.svelte') }),
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
