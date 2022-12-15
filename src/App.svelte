<script>
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'
  import { routes } from '$/utils'
  import { client, isAuthenticated, user } from '$/stores'
  import { auth } from '$/services'
  import './app.css'

  onMount(async () => {
    $client = await auth.createClient()

    $isAuthenticated = await $client.isAuthenticated()
    $user = await $client.getUser()
  })
</script>

<main>
  <Router {routes} />
</main>

<style>
  main {
    @apply flex flex-col items-center;
  }
</style>
