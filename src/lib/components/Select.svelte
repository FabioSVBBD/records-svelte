<script>
  import { clickOutside } from '$/directives'
  import { DownArrow } from '@assets/icons'
  import { fly } from 'svelte/transition'

  export let value
  export let options
  export let defaultOption

  let open = false

  const toggleOpen = () => (open = !open)

  const optionChosen = option => {
    value = option
    toggleOpen()
  }
</script>

<article>
  <section id="select" class:open on:click={toggleOpen} on:keydown={toggleOpen}>
    {value.label || value} <img src={DownArrow} class:open alt="Down Arrow" />
  </section>

  {#if open}
    <section
      id="options"
      transition:fly={{ y: -2, duration: 150 }}
      use:clickOutside
      on:click_outside={() => (open = false)}
    >
      <p on:click={() => optionChosen(defaultOption)} on:keydown={() => optionChosen(defaultOption)}>{defaultOption}</p>

      {#each options as option (option)}
        <p on:click={() => optionChosen(option)} on:keydown={() => optionChosen(option)}>
          {option.label || option}
        </p>
      {/each}
    </section>
  {/if}
</article>

<style>
  article {
    cursor: pointer;
    position: relative;
    width: 12rem;

    color: rgb(0 0 0 / 0.8);
    font-weight: 500;
  }

  @media screen and (max-width: 640px) {
    article {
      width: 100%;
    }
  }

  img {
    @apply transition-all;
    width: 20px;
    height: 10px;
  }

  img.open {
    transform: rotateX(180deg);
  }

  #select {
    background-color: rgb(255 255 255 / 0.5);

    display: flex;
    align-items: center;
    justify-content: space-between;

    @apply text-lg rounded-md px-4 py-1 transition-all;
  }

  #select.open {
    @apply text-lg rounded-b-none;
  }

  #options {
    position: absolute;
    background-color: rgb(255 255 255);
    width: 100%;
    z-index: 2;
    max-height: 10rem;
    overflow-y: auto;

    @apply text-lg rounded-b-md px-2 py-1;
  }

  #options > p {
    margin-top: 0.5rem;
    color: rgb(0 0 0 / 0.8);
    border-bottom: 1px solid rgb(0 0 0 / 0.5);
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(206, 206, 206);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(145, 145, 145);
  }
</style>
