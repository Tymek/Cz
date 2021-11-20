mkdir -p ./static/logos/png
rm static/logos/png/*
magick mogrify \
  -verbose \
  -path static/logos/png \
  -resize 128x128 \
  -format png \
  -background none \
  -gravity center \
  -extent 128x128 \
  static/logos/svg/*
