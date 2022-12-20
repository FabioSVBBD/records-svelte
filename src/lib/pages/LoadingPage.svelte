<script>
  import { onMount, onDestroy } from 'svelte'
  import { Animation } from '$/components'
  import { typewriter } from '$/directives'
  import { book, computer, globe, layers, barChart } from '@assets/animations'

  const animations = [book, computer, globe, layers, barChart]
  const index = Math.floor(Math.random() * animations.length)

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

<section class="flex flex-col justify-center items-center w-full min-h-screen">
  <Animation src={animations[index]} loop />
  <div id="loading">
    Loading
    <div id="type-area">
      {#if visible}
        <mark in:typewriter={{ speed: 0.5 }}>...</mark>
      {/if}
    </div>
  </div>
</section>

<style>
  #loading {
    display: flex;
    font-size: 1.4rem;
    font-weight: 400;
    color: rgb(0 0 0 / 0.7);
  }

  #type-area {
    width: 0;
  }

  mark {
    background: none;
  }
</style>
