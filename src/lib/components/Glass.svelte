<script>
  import { fade } from 'svelte/transition'

  export let column = false
</script>

<section transition:fade={{ duration: 150 }} class:column><slot /></section>

<style>
  section {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 2rem;

    z-index: 5;

    @apply rounded-md;
  }

  .column {
    flex-direction: column;
  }
</style>
