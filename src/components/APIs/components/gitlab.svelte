<script>
  import Block from './block.svelte'
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { range, isEmpty } from 'ramda'
  import moment from 'moment'

  let data = {}
  const daysToShow = 7 * 11
  const days = range(0, daysToShow).map(
    offset => moment().subtract(daysToShow - offset, 'days').format('YYYY-MM-DD'),
  )

  const loadData = async () => {
    const response = await axios.get('/api/gitlab')

    data = response.data
  }

  const getOpacity = day => {
    if (data[day]) {
      return Math.min(1, data[day] / 10)
    }

    return 0
  }

  onMount(loadData)
</script>

<style type="text/scss" lang="scss">
  .calendar {
    display: grid;
    // grid-template-columns: repeat(7, auto);
    grid-template-rows: repeat(7, auto);
    grid-auto-flow: column;
    justify-content: center;
    align-content: center;
    grid-gap: 0.5rem;
  }

  .day {
    background: #fff;
    width: 1rem;
    height: 1rem;
    margin: 0;
    padding: 0;
  }
</style>

{#if !isEmpty(data)}
<Block
  background={'#3f3177'}
  color="white"
  title="GitLab"
  link="https://gitlab.com/Tymek"
>
  <div class="calendar">
    {#each days as day}
      <figure
        class="day"
        title={day}
        style={`opacity: ${getOpacity(day)}`}
      ></figure>
    {/each}
  </div>
</Block>
{/if}
