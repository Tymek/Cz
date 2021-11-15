<script>
export let height = 1
export let title = ''
export let link = ''
export let color = 'black'
export let background = 'transparent'
</script>

<style type="text/scss" lang="scss">
  .block {
    border-radius: (4rem / 16);
    padding: 1rem;
  }

  .title {
    margin-top: 0.25rem;
    font-size: 1.546391438rem;

    a {
      display: block;
      text-decoration: none;

      &:hover,
      &:focus,
      &:active {
        text-decoration: underline;
      }
    }
  }
</style>

<div
  class="block"
  style="color: {color}; background: {background}; grid-row-start: span {height};"
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
