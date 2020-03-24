<script>
  import { onMount, onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import Papa from 'papaparse'
  import * as THREE from 'three'
  import {
    pipe,
    uniq,
    map,
    prop,
    filter,
  } from 'ramda'

  // import { CustomTrackballControls } from './customControls'

  let container
  let graph
  let width, height

  const addIds = data => data.map(item => ({
    id: item.tech,
    ...item,
  }))

  const addImage = item => ({
    ...item,
    // img: (() => {
    //   const img = new Image()
    //   img.src = `./svg/${item.id.toLowerCase().replace(' ', '-')}.svg`
    //   return img
    // })(),
    img3d: (item.color
      ? `/logos/png/${item.id.toLowerCase().replace(' ', '-')}.png`
      : null
    ),
  })

  const addImages = data => data.map(addImage)

  const originsToArray = data => data.map(item => ({
    ...item,
    links: item.origin ? item.origin.split(/, /) : [],
  }))

  const getGroups = pipe(
    map(prop('group')),
    filter(item => item !== ''),
    uniq,
    map(id => ({ id })),
  )

  const getData = input => new Promise(resolve => Papa.parse(input, {
    worker: true,
    header: true,
    complete: function(results) {
      resolve(
        pipe(
          filter(({ id }) => id !== ''),
          addIds,
          addImages,
          originsToArray,
        )(results.data)
      )
    },
  }))

  const getLinks = data => {
    const links = []

    data.forEach(item => {
      if (item.links && item.links.length > 0) {
        item.links.forEach(source => {
          links.push({
            source,
            target: item.id,
          })
        })
      }
    })

    return links
  }

  const getGroupLinks = data => {
    const links = []

    data.forEach(({ id, group }) => {
      if (group && id) {
        links.push({
          source: group,
          target: id,
        })
      }
    })

    return links
  }

  const create3dGraph = async gData => {
    // IMPORTANT NOTE: Implementation of 'github.com/vasturiano/3d-force-graph' was blocking scroll, hence I scaveged it into './customRenderer'
    const ForceGraph3D = (await import('./customRenderer/forceGraph.js')).default
    // const ForceGraph3D = (await import('3d-force-graph')).default

    graph = ForceGraph3D()
    graph.backgroundColor('rgba(0,0,0,0)')
    graph.linkWidth(1)
    graph.linkOpacity(0.025)
    graph.linkColor(() => "#000000")
    graph.showNavInfo(false)
    graph.width(width)
    graph.height(height)
    graph.nodeLabel(({ tech, id }) => {
      return `<label style="
        display: inline-block;
        color: rgba(0, 0, 0, 0.9);
        background: rgba(255, 255, 255, 0.75);
        border-radius: 3px;
        padding: 3px 5px;
        font-weight: 300;
        font-family: Spartan, sans-serif;
      ">${tech || id}</label>`
    })
    graph.onNodeClick(node => {
      const distance = 150;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
    });
    graph.nodeThreeObject(({ img3d }) => {
      const img = img3d || '/null.png'

      // use a sphere as a drag handle
      const obj = new THREE.Mesh(
        new THREE.SphereGeometry(9),
        new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 }),
      )

      // add img sprite as child
      const imgTexture = new THREE.TextureLoader().load(img)
      const material = new THREE.SpriteMaterial({ map: imgTexture, })
      const sprite = new THREE.Sprite(material)
      sprite.scale.set(20, 20)
      obj.add(sprite)

      return obj
    })
    const distance = 250

    graph(container).graphData(gData)
    graph.cameraPosition({
      x: -32.52637986278481,
      y: 159.98034756723706,
      z: 476.1402222391635,
    });

    return graph
  }

  const onOrientationChange = () => {
    setTimeout(() => {
      graph.width(width)
      graph.height(height)
    }, 300)
  }

  onMount(async () => {
    const skills = await fetch('/skills.tsv')
    const text = await skills.text()
    const nodes = await getData(text)
    const links = getLinks(nodes)

    // const groupNodes = getGroups(nodes)
    const groupLinks = getGroupLinks(nodes)

    const data = {
      nodes: [ ...nodes/*, ...groupNodes*/ ],
      links: [ ...links, ...groupLinks ],
    }

    await create3dGraph(data)

    window.addEventListener('orientationchange', onOrientationChange, { passive: true })
  })

  onDestroy(() => {
    window.removeEventListener('orientationchange', onOrientationChange)
  })
</script>

<style>
	div {
		position: relative;
		width: 100%;
		height: 70vh;
		background-color: #eee;
		margin: 0;
		box-sizing: border-box;
  }
</style>


<h2>Welcome in my universe</h2>
<div
  bind:this={container}
  bind:clientWidth={width}
  bind:clientHeight={height}
/>
<h2>Glad you came</h2>
