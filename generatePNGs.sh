mkdir -p ./content/assets/logos/png
rm content/assets/logos/png/*
magick mogrify \
  -verbose \
  -path content/assets/logos/png \
  -resize 256x256 \
  -format png \
  -background none \
  -gravity center \
  -extent 256x256 \
  content/assets/logos/svg/*
