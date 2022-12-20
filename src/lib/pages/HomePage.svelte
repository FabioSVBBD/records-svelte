<script>
  import { Nav, Button } from '$/components'
  import { auth } from '$/services'
  import { client, isAuthenticated } from '$/stores/auth0'
  import { rightArrow } from '@assets/icons'

  const login = () => auth.loginWithPopup($client)
  const signup = () => auth.signUp($client)
</script>

<Nav />

<section>
  {#if $isAuthenticated}
    <a href="/#/transactions">
      Transactions
      <img src={rightArrow} alt="right arrow" />
    </a>
  {:else}
    <div class="flex flex-col gap-y-2">
      <Button tier="secondary" on:click={login}>Log in</Button>
      <Button on:click={signup}>Sign up</Button>
    </div>
  {/if}
</section>

<style>
  section {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    border: 1px solid rgb(0 0 0 / 0.5);
    font-size: 2rem;
    padding-bottom: 0.1rem;

    @apply px-4 rounded-lg transition-all;
  }

  a:hover {
    column-gap: 2rem;
    border-color: rgb(0 0 0);
  }

  img {
    width: 0.6rem;
    height: 1.2rem;
    align-items: center;
    margin-top: 0.5rem;
  }

  div {
    width: min(20rem, 90%);
  }
</style>
