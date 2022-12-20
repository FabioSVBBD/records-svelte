<script>
  import { Animation } from '$/components'
  import { book, computer, globe, layers, barChart } from '@assets/animations'

  const animations = [book, computer, globe, layers, barChart]
  const index = Math.floor(Math.random() * animations.length)
</script>

<section class="flex flex-col justify-center items-center w-full min-h-screen">
  <Animation src={animations[index]} loop />
  <p>Loading</p>
</section>

<style>
  p {
    font-size: 1.4rem;
    font-weight: 400;
    color: rgb(0 0 0 / 0.7);
  }
</style>
