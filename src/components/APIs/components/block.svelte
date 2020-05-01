<script>
export let color = 'black'
export let background = 'transparent'
</script>

<style>
  .block {
    border-radius: 4px;
  }
</style>

<div
  class="block"
  style="color: {color}; background: {background};"
>
  <slot></slot>
</div>
