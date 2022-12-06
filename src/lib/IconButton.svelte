<script>
  import add from '../assets/add.svg'
</script>

<img src={add} alt="add" on:click on:keydown />

<style>
  img {
    margin: auto;
    border-radius: 50%;

    @apply transition-all duration-200;
  }

  img:hover {
    background: rgb(0 0 0 / 0.1);
    cursor: pointer;
  }
</style>
