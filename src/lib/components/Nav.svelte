<script>
  import { fade } from 'svelte/transition'
  import { castle } from '@assets/icons'
  import { routeNameMap } from '$/utils'
  import { Button, Burger } from '$/components'
  import { auth } from '$/services'
  import { client, isAuthenticated } from '$/stores/auth0'

  const login = () => auth.loginWithPopup($client)
  const logout = () => auth.logout($client)

  let burgerOpen = false
</script>

<header>
  <section id="logobox">
    <img src={castle} alt="Records" />
    <h1>Records</h1>
  </section>

  <nav>
    {#each routeNameMap as page}
      <a href={page.route}>{page.name}</a>
    {/each}
  </nav>

  {#if !$isAuthenticated}
    <section class="buttons">
      <Button tier="secondary" on:click={login}>Log in</Button>
      <Button>Sign up</Button>
    </section>
  {:else}
    <section class="buttons">
      <Button tier="secondary" on:click={logout}>Logout</Button>
    </section>
  {/if}

  <Burger hideDesktop open={burgerOpen} on:click={() => (burgerOpen = !burgerOpen)} />

  {#if burgerOpen}
    <article transition:fade={{ duration: 100 }} class="mobile-nav">
      {#each routeNameMap as page}
        <a href={page.route}>{page.name}</a>
      {/each}

      {#if !$isAuthenticated}
        <button type="button" on:click={login}>Log in</button>
        <button type="button">Sign up</button>
      {:else}
        <button type="button" on:click={logout}>Logout</button>
      {/if}
    </article>
  {/if}
</header>

<style>
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }

  section#logobox {
    width: 14.8rem;
  }

  section,
  nav {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  a {
    font-weight: 600;
    font-size: 1rem;
    line-height: 2rem;
  }

  a:hover {
    color: rgb(255 255 255 / 0.5);
  }

  img[alt='Records'] {
    height: 4rem;
  }

  article.mobile-nav {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;

    @apply bg-slate-200;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 1rem;
  }

  article.mobile-nav > a {
    font-size: 2rem;
  }

  article.mobile-nav > button {
    line-height: 1;
    font-size: 2rem;
    font-weight: 600;
    color: #138ec4;
  }

  @media only screen and (max-width: 992px) {
    nav {
      display: none;
    }

    section.buttons {
      display: none;
    }
  }
</style>
