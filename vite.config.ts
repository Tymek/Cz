import { sveltekit } from '@sveltejs/kit/vite'
import svg from '@poppanator/sveltekit-svg'
import { defineConfig } from 'vite'

export default defineConfig({
	define: {
		__BUILD_TIMESTAMP__: JSON.stringify(new Date().toISOString())
	},
	plugins: [
		svg({
			type: 'component',
			/** @type {import('svgo').OptimizeOptions} */
			svgoOptions: {
				plugins: [
					'cleanupAttrs',
					'mergeStyles',
					'inlineStyles',
					'removeDoctype',
					'removeXMLProcInst',
					'removeComments',
					'removeMetadata',
					'removeUselessDefs',
					'removeEditorsNSData',
					'removeEmptyAttrs',
					'removeHiddenElems',
					'removeEmptyText',
					'removeEmptyContainers',
					'cleanupEnableBackground',
					'minifyStyles',
					'convertPathData',
					'convertTransform',
					'removeUnknownsAndDefaults',
					'removeNonInheritableGroupAttrs',
					'removeUselessStrokeAndFill',
					'removeUnusedNS',
					'cleanupIds',
					'cleanupNumericValues',
					'moveElemsAttrsToGroup',
					'moveGroupAttrsToElems',
					'collapseGroups',
					'mergePaths',
					'convertShapeToPath',
					'convertEllipseToCircle',
					'sortDefsChildren'
				]
			}
		}),
		sveltekit()
	]
})
