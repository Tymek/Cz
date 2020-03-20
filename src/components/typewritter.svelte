<script>
  import { onMount, onDestroy } from 'svelte'
  import Typed from 'typed.js'

  export let lines

  let container
  let typed
  
  var options = {
    strings: lines,
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

<p>
  <span bind:this={container} />
</p>
