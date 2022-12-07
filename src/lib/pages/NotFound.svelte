<script>
  import { Animation } from '$/components'
  import { target } from '@assets/animations'
  import { link } from 'svelte-spa-router'
</script>

<article>
  <Animation src={target} height="20rem" loop />

  <div>
    <h2>404!</h2>
    <h3>There's nothing here...</h3>
  </div>

  <a href="/home" use:link>Go home</a>
</article>

<style>
  article {
    flex-grow: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 1.5rem;
  }
</style>
