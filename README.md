<h1 align="center">
  Tymek.Cz
</h1>

Powered by SvelteKit.

## How to run

1. Precompile assets. This requires `imagemagick`, `wget`, `unzip` and `woff2_compress`. Under Linux run `./generatePNGs.sh && ./generateFonts.sh`, or skip that and use docker:

```sh
docker run -it -v ${PWD}:/srv -w /srv scrlk/woff2 sh -c "apk add --no-cache imagemagick && ./generatePNGs.sh &&./generateFonts.sh"
```

2. Installed dependencies and start a development environment. (default on [localhost:3000](http://localhost:3000))

```bash
yarn && yarn vercel
```

3. Copy `.env.example` to `.env` and change `MONGO_URI` and `ADMIN_TOKEN`.

4. Configure integrations credentials on [/dashboard](http://localhost:3000/dashboard).
