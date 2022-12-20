<script>
  import { user } from '$/stores'
</script>

<header>
  <h1>{$user.given_name || $user.nickname || $user.name}</h1>
  <img src={$user.picture} alt="profile" class="h-8 sm:h-16" />
</header>

<style>
  header {
    @apply mb-8 flex justify-between items-center;
    text-align: center;

    width: 100%;
    background: rgb(255 255 255 / 0.2);
    padding: 0.4rem 1rem;
  }

  header img {
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }

  @media screen and (max-width: 640px) {
    header img {
      width: 2rem;
      height: 2rem;
    }
  }

  h1 {
    @apply text-3xl font-semibold;
  }
</style>
