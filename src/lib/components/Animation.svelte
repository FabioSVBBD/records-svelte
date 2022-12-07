<script>
  import { onMount } from 'svelte'
  import lottie from 'lottie-web'

  export let src
  export let height = '8rem'
  export let loop = false

  let container

  onMount(() => {
    const animation = lottie.loadAnimation({
      container,
      animationData: src,
      renderer: 'svg',
      loop,
      autoplay: true,
    })

    animation.addEventListener('DOMLoaded', () => {
      animation.setSpeed(1)
      animation.setDirection(1)
    })
  })
</script>

<div style="height: {height}" bind:this={container} />
