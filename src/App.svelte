<script>
  import { onMount } from 'svelte'
  import Router, { push } from 'svelte-spa-router'
  import wrap from 'svelte-spa-router/wrap'
  import { client, isAuthenticated, user } from '$/stores'
  import { auth } from '$/services'
  import './app.css'
  import LoadingPage from '$/pages/LoadingPage.svelte'

  const initializeClient = async () => {
    $client = await auth.createClient()

    $isAuthenticated = await $client.isAuthenticated()
    $user = await $client.getUser()
  }

  onMount(initializeClient)

  const routes = {
    '/': wrap({
      asyncComponent: () => import('$/pages/HomePage.svelte'),
      loadingComponent: LoadingPage,
    }),
    '/transactions': wrap({
      asyncComponent: () => import('$/pages/TransactionsPage.svelte'),
      loadingComponent: LoadingPage,
      conditions: [
        async () => {
          await initializeClient()

          return $isAuthenticated
        },
      ],
    }),
    '*': wrap({
      asyncComponent: () => import('$/pages/NotFoundPage.svelte'),
      loadingComponent: LoadingPage,
    }),
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
