<script>
  import { line } from '@assets/icons'

  export let hideDesktop = false
  export let hideTablet = false

  let opened = false

  const toggleMenu = () => (opened = !opened)
</script>

<section class:hideDesktop class:hideTablet class:opened on:click={toggleMenu} on:keydown={toggleMenu}>
  <img src={line} alt="line" class="n1" />
  <img src={line} alt="line" class="n2" />
  <img src={line} alt="line" class="n3" />
</section>

<style>
  section {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    transition: all;
    position: relative;
    width: 2rem;
  }

  img[alt='line'] {
    position: absolute;
    width: 2rem;
    pointer-events: none;
    transition: 0.25s ease-in-out;
  }

  img.n1 {
    top: 1.5rem;
  }

  img.n2 {
    top: 2rem;
  }

  img.n3 {
    top: 2.5rem;
  }

  section.opened > img.n1 {
    transform: rotate(45deg) translateX(8px) translateY(8px);
  }

  section.opened > img.n2 {
    transform: rotate(-45deg) translateY(2px) translateX(-2px);
  }

  section.opened > img.n3 {
    transform: scale(0);
  }

  @media screen and (max-width: 992px) {
    section.hideTablet {
      display: none;
    }
  }

  @media screen and (min-width: 992px) {
    section.hideDesktop {
      display: none;
    }
  }
</style>
