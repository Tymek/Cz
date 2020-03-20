mkdir -p ./static/logos/png
rm static/logos/png/*
magick mogrify \
  -verbose \
  -path static/logos/png \
  -resize 256x256 \
  -format png \
  -background none \
  -gravity center \
  -extent 256x256 \
  static/logos/svg/*
