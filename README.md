<h1 align="center">
  Tymek.Cz
</h1>

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Developing

Installed dependencies and start a development server:

```bash
yarn && yarn vercel
```

Development environment starts by default on [localhost:3000](http://localhost:3000).

## Building

Project is set up with Vercel adapter for SvelteKit. Remember to set `.env` variables!

```bash
yarn build
```

> You can preview the built app with `yarn preview`, for frontend only. This should _not_ be used to serve your app in production.

### Precompile assets

Requires `imagemagick`, `wget`, `unzip` and `woff2_compress`. Run under Linux.

```sh
./generatePNGs.sh && ./generateFonts.sh
```

Or use docker

```sh
docker run -it -v ${PWD}:/srv -w /srv scrlk/woff2 sh -c "apk add --no-cache imagemagick && ./generatePNGs.sh &&./generateFonts.sh"
```

## Authentication for integrated services

OAuth2 is a mess. With slightly different request formats in each service unification and abstracting the flow is not important.
Client libraries focus on acting as proxy for browsers.
I need to do something different - grab tokens and pass in to the database for use in server-side fetching later.
