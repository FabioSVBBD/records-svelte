<script>
  import { onDestroy, onMount } from 'svelte'
  import { typewriter } from '$/directives'
  import { Animation } from '$/components'
  import { castle } from '@assets/animations'

  let visible = false
  let interval

  onMount(
    () =>
      (interval = setInterval(() => {
        visible = !visible
      }, 1000))
  )

  onDestroy(() => {
    if (interval) {
      clearInterval(interval)
    }
  })
</script>

<section>
  <Animation src={castle} loop />

  <div>
    <p>Fetching</p>
    {#if visible}
      <p in:typewriter={{ speed: 0.5 }}>...</p>
    {/if}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div {
    display: flex;
    width: 5.5rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
  }

  p:first-child {
    width: 4.8rem;
  }

  p:nth-child(2) {
    width: 1rem;
  }
</style>
