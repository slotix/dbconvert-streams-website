
#!/bin/bash
OUTPUT_DIR=~/screenshots
mkdir -p $OUTPUT_DIR
FILENAME=$(date +%Y-%m-%d_%H-%M-%S)

# Fixed parameters for the screenshot
TOP_LEFT_X=${1:-64}
TOP_LEFT_Y=${2:-176}
WIDTH=${3:-1920}
HEIGHT=${4:-1080}

# Construct geometry for Grim
GEOMETRY="${TOP_LEFT_X},${TOP_LEFT_Y} ${WIDTH}x${HEIGHT}"

# Debugging geometry string
echo "Using geometry: $GEOMETRY"

# Take screenshot using Grim
grim -s 1 -g "$GEOMETRY" "$OUTPUT_DIR/screenshot-$FILENAME.png" || {
  echo "Error: Invalid geometry or screenshot failed.";
  exit 1;
}

# Convert to WebP
magick  "$OUTPUT_DIR/screenshot-$FILENAME.png" -quality 90 "$OUTPUT_DIR/screenshot-$FILENAME.webp" || {
  echo "Error: Conversion to WebP failed.";
  exit 1;
}

echo "Screenshot saved as $OUTPUT_DIR/screenshot-$FILENAME.webp"
