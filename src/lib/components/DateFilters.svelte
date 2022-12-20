<script>
  import { Select } from '$/components'
  import { days, months, years } from '$/utils'

  const DEFAULT = 'any'

  export let year = new Date().getUTCFullYear()
  export let month = months.find(m => m.value === new Date().getMonth() + 1)
  export let day = DEFAULT
</script>

<div class="flex flex-col sm:flex-row w-full justify-between items-center mb-8 gap-x-2 gap-y-1">
  <Select bind:value={year} options={years} defaultOption={DEFAULT} />
  <Select bind:value={month} options={months} defaultOption={DEFAULT} />
  <Select bind:value={day} options={days(month?.value || 0)} defaultOption={DEFAULT} />
</div>
