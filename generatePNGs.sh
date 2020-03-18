mkdir -p ./src/png
magick mogrify \
  -verbose \
  -path src/png \
  -resize 200x200 \
  -format png \
  -background none \
  -gravity center \
  -extent 200x200 \
  src/svg/*

# mogrify -format png -path $PWD/png -resize 100x100 svg/*.svg
