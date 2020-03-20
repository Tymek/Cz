<h1 align="center">
  Tymek.Cz
</h1>

### Precompile assets
Requires `imagemagick`, `wget`, `unzip` and `woff2_compress`. Run under Linux.
``` sh
./generatePNGs.sh && ./generateFonts.sh
```

Or use docker
``` sh
docker run -it -v ${PWD}:/srv -w /srv scrlk/woff2 sh -c "apk add --no-cache imagemagick && ./generatePNGs.sh &&./generateFonts.sh"
```

### Start Gatsby
Requires `nodejs`

``` sh
npm i && npm start
```

Or
``` sh
docker run -it -p "8000:8000" -v ${PWD}:/srv -w /srv node:12 sh -c "npm i && npm start"
```
