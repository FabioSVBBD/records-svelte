<script>
  export let tier = 'primary'
  export let disabled = false
</script>

<button type="button" class={tier} {disabled} on:click><slot /></button>

<style>
  button {
    flex-grow: 1;
    padding: 0.25rem 2rem;

    width: 100%;

    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;

    border-radius: 0.375rem;

    transition-duration: 200ms;
    @apply shadow-md transition-all;
  }

  button.primary {
    @apply bg-blue-600/70 text-white;
  }

  button.primary:hover {
    @apply bg-blue-600/50;
  }

  button.secondary {
    @apply bg-white/40 text-black/90;
  }

  button.secondary:hover {
    @apply bg-white/60;
  }

  button.tertiary {
    @apply border-2 border-white/40 text-white/70;
  }

  button.tertiary:hover {
    @apply bg-white/30;
  }

  button:disabled {
    cursor: not-allowed;
    @apply grayscale;
  }
</style>
