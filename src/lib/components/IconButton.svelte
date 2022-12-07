<script>
  export let src
  export let alt
  export let className = ''
</script>

<img {src} {alt} on:click on:keydown class={className} />

<style>
  img {
    height: 2.5rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    background: rgb(0 0 0 / 0.1);

    @apply transition-all duration-200;
  }

  img:hover {
    background: rgb(0 0 0 / 0.2);
    cursor: pointer;
  }
</style>
