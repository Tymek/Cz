import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import svg from '@poppanator/sveltekit-svg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: vercel(),
    vite: {
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
              // 'removeTitle',
              // 'removeDesc',
              'removeUselessDefs',
              'removeEditorsNSData',
              'removeEmptyAttrs',
              'removeHiddenElems',
              'removeEmptyText',
              'removeEmptyContainers',
              // 'removeViewBox',
              'cleanupEnableBackground',
              'minifyStyles',
              'convertColors',
              'convertPathData',
              'convertTransform',
              'removeUnknownsAndDefaults',
              'removeNonInheritableGroupAttrs',
              'removeUselessStrokeAndFill',
              'removeUnusedNS',
              'cleanupIDs',
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
        })
      ]
    }
  }
};

export default config;
