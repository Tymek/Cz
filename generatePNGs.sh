mkdir -p ./static/png
rm static/png/*
magick mogrify \
  -verbose \
  -path static/png \
  -resize 256x256 \
  -format png \
  -background none \
  -gravity center \
  -extent 256x256 \
  static/svg/*
