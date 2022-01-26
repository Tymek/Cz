---
postTitle: 'Messenger app chat with gradient background in CSS'
focusKeyphrase: 'best medium format camera'
# TODO: update dates
datePublished: '2021-04-07T16:04:42.000+0100'
lastUpdated: '2021-04-14T10:17:52.000+0100'
seoMetaDescription: "Best medium format camera for starting out is probably a question at the front of your mind right now! Let's take a look."
featuredImage: 'best-medium-format-camera-for-starting-out.jpg'
featuredImageAlt: 'Photograph of a Hasselblad medium format camera with the focusing screen exposed'
ogImage: 'best-medium-format-camera-for-starting-out-open-graph.jpg'
ogSquareImage: 'best-medium-format-camera-for-starting-out-open-graph-square.jpg'
twitterImage: 'best-medium-format-camera-for-starting-out-twitter.jpg'
categories: ''
tags: ''
---

# Messenger app chat in CSS

With Svelte and beautiful CSS.

Expected result:

<!-- TODO: insert gif of Messenger app with theme -->

Let's break it down into actionable steps.

### Fixed position

How to create a background with fixed position that is also clipped to the message bubble?
This is accually a bit tricky, because as far as I know it cannot be done without JavaScript.

<!-- TODO: illustration -->

https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

In Svelte my component looks something like this:

```xml
<script lang="ts">
	let ref: HTMLQuoteElement
	let top: number

	function loop() {
		top = ref.getBoundingClientRect().top
		requestAnimationFrame(loop)
	}

	onMount(loop)
</script>

<blockquote bind:this={ref} style={`--top:-${top || 0}px`}>
	<slot />
</blockquote>

<style>...</style>
```

## Glass effect

Css backdrop filter.
https://css.glass/

## Gradient

https://www.joshwcomeau.com/css/make-beautiful-gradients/

## Smoooth corners

There is an artifact near rounded corners when rendering our element... (screenshot)

I could use:
https://css-houdini.rocks/corner-shape
https://iamvdo.me/en/blog/smooth-corners-with-css-houdini
But it only works in Chrome/Edge/Opera at the time of writing. See _[Is Houdini ready yet‽](https://ishoudinireadyyet.com/)_.

TODO: SVG solution

### Animate this!

<!-- because apparently I hate myself -->

## Summary

This is gorgous! &hellip;but it took a while.
And the lesson for all the managers, decision makers, designers and developers is: it takes time to create something applealing.
