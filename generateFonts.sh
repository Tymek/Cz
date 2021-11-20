mkdir -p static/fonts
wget https://fonts.google.com/download?family=Playfair%20Display -O /tmp/playfair-display.zip >&2
wget https://fonts.google.com/download?family=Spartan -O /tmp/spartan.zip >&2
unzip /tmp/playfair-display.zip -d /tmp/playfair-display >&2
unzip /tmp/spartan.zip -d /tmp/spartan >&2
woff2_compress /tmp/spartan/Spartan-VariableFont_wght.ttf 
woff2_compress /tmp/playfair-display/PlayfairDisplay-Italic-VariableFont_wght.ttf
woff2_compress /tmp/playfair-display/PlayfairDisplay-Italic-VariableFont_wght.ttf
cp /tmp/spartan/Spartan-VariableFont_wght.woff2 ./static/fonts/spartan.woff2
cp /tmp/playfair-display/PlayfairDisplay-Italic-VariableFont_wght.woff2 ./static/fonts/playfair-display.woff2
cp /tmp/playfair-display/PlayfairDisplay-Italic-VariableFont_wght.woff2 ./static/fonts/playfair-display-italic.woff2
