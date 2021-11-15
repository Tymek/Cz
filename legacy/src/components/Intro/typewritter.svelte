<script>
  import { onMount, onDestroy } from 'svelte'
  import Typed from 'typed.js'

  export let lines

  let container
  let typed
  
  var options = {
    strings: lines,
    cursorChar: ' ',
    loop: true,
    typeSpeed: 80,
    backSpeed: 30,
  };

  onMount(() => {
    typed = new Typed(container, options)
  })

  onDestroy(() => {
    if (typed) typed.destroy()
  })
</script>

<style>
  :global(.typed-cursor) {
    display: inline-block;
    height: 1.2em;
    width: 2px;
    background: #444;
    margin: 0 0 -0.2em 2px;
  }
</style>

<div class="typewritter">
  <span bind:this={container} />
  <span>&nbsp;</span> 
</div>
