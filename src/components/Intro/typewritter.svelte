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

<div>
  <span bind:this={container} />
  <span>&nbsp;</span> 
</div>
