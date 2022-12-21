<div class="flex gap-x-2 items-center">
  <div class="ball" style="--index: 1" />
  <div class="ball" style="--index: 2" />
  <div class="ball" style="--index: 3" />
  <div class="ball" style="--index: 4" />
  <div class="ball" style="--index: 5" />
</div>

<style>
  .ball {
    border-radius: 50%;
    background: #333333;
    width: 1rem;
    height: 1rem;

    animation: growAndShrink 0.4s infinite ease-in-out;
    animation-delay: calc(250ms * var(--index));
  }

  @keyframes growAndShrink {
    0% {
      height: 0.5rem;
      width: 0.5rem;
    }

    50% {
      height: 0.75rem;
      width: 0.75rem;
    }

    100% {
      height: 0.5rem;
      width: 0.5rem;
    }
  }
</style>
