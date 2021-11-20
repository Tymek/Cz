<h1 align="center">
  Tymek.Cz
</h1>

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Developing

Once you've created a project and installed dependencies, start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
yarn build
```

> You can preview the built app with `yarn preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

### Precompile assets

Requires `imagemagick`, `wget`, `unzip` and `woff2_compress`. Run under Linux.

```sh
./generatePNGs.sh && ./generateFonts.sh
```

Or use docker

```sh
docker run -it -v ${PWD}:/srv -w /srv scrlk/woff2 sh -c "apk add --no-cache imagemagick && ./generatePNGs.sh &&./generateFonts.sh"
```
