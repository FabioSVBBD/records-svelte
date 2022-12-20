<script>
  import { thumbsDown } from '@assets/animations'
  import { Animation } from '$/components'
</script>

<Animation src={thumbsDown} />
<p>
  Could not get your transactions. <br />
  <strong>Are you experiencing network problems?</strong>
</p>

<style>
  p {
    text-align: center;
    font-size: 1rem;
  }

  strong {
    font-size: 1.2rem;
  }
</style>
