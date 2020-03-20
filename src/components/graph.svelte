<script>
  import { onMount } from 'svelte'
  import Papa from 'papaparse'
  import * as THREE from 'three'

  import {
    pipe,
  } from 'ramda'

  let container


  const addIds = data => data.map(item => ({
    id: item.tech,
    ...item,
  }))

  const addImages = data => data.map(item => ({
    ...item,
    img: (() => {
      const img = new Image()
      img.src = `./logos/svg/${item.id.toLowerCase().replace(' ', '-')}.svg`
      return img
    })(),
    img3d: `./logos/png/${item.id.toLowerCase().replace(' ', '-')}.png`,
  }))

  const originsToArray = data => data.map(item => ({
    ...item,
    links: item.origin ? item.origin.split(/, /) : [],
  }))


  const getData = input => new Promise(resolve => Papa.parse(input, {
    worker: true,
    header: true,
    complete: function(results) {
      resolve(
        pipe(
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
      if (item.links.length > 0) {
        item.links.forEach(source => {
          links.push({
            source,
            target: item.id,
          })
        })

        // links.push({
        //   source: item.group,
        //   target: item.id,
        // })
      }
    })

    return links
  }

  const create3dGraph = async gData => {
    const ForceGraph3D = (await import('3d-force-graph')).default

    const graph = ForceGraph3D()

    graph.backgroundColor('rgba(0,0,0,0)')
    graph.linkWidth(1)
    graph.linkOpacity(0.6)
    graph.linkColor(new THREE.Color('red'))

    const linkMaterial = new THREE.MeshLambertMaterial({
      color: '#000000',
      transparent: true,
      opacity: 0.1,
    })

    graph.linkMaterial(linkMaterial)
    graph.showNavInfo(false)

    graph.nodeThreeObject(({ img3d }) => {
      const img = img3d || './null.png'

      // use a sphere as a drag handle
      const obj = new THREE.Mesh(
        new THREE.SphereGeometry(7),
        new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
      )

      // add img sprite as child
      const imgTexture = new THREE.TextureLoader().load(img)
      const material = new THREE.SpriteMaterial({ map: imgTexture })
      const sprite = new THREE.Sprite(material)
      sprite.scale.set(16, 16)
      obj.add(sprite)

      return obj
    })

    return graph(container).graphData(gData)
  }

  onMount(async () => {
    const skills = await fetch('/skills.tsv')
    const text = await skills.text()
    const nodes = await getData(text)
    const links = getLinks(nodes)

    const data = { nodes, links }

    await create3dGraph(data)

    console.log(data)
  })
</script>

<style>
	div {
		position: relative;
		max-width: 56em;
		max-height: 56em;
		background-color: #eee;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<div bind:this={container} />
