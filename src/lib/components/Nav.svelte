<script>
  import { castle } from '@assets/icons'
  import { routeNameMap } from '$/utils'
  import { Button, Burger } from '$/components'
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

  <section class="buttons">
    <Button tier="secondary">Log in</Button>
    <Button>Sign up</Button>
  </section>

  <Burger hideDesktop />
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

  @media only screen and (max-width: 992px) {
    nav {
      display: none;
    }

    section.buttons {
      display: none;
    }
  }
</style>
