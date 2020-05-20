<script>
export let title = ''
export let link = ''
export let color = 'black'
export let background = 'transparent'
</script>

<style type="text/scss" lang="scss">
  .block {
    border-radius: 4px;
    padding: 1rem;
  }

  .title {
    margin-top: 0;
  }
</style>

<div
  class="block"
  style="color: {color}; background: {background};"
>
  <h3 class="title">
    {#if link}
      <a href={link}>{title}</a>
    {:else}
      {title}
    {/if}
  </h3>
  <slot></slot>
</div>
