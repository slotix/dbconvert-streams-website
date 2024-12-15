# Manual: Taking Screenshots with Grim and Converting to WebP

## Prerequisites

1. Install **grim** for taking Wayland-native screenshots:

   ```bash
   sudo pacman -S grim
   ```

2. Install **ImageMagick** for magick converting images to `.webp` format:

   ```bash
   sudo pacman -S imagemagick
   ```

3. (Optional) Create a directory for storing screenshots:

   ```bash
   mkdir -p ~/screenshots
   ```

---

## Taking a Screenshot with Fixed Parameters

### Step 1: Make sure you have correct scaling factor

It is important to have correct scaling factor, otherwise the screenshot will be scaled and the quality will be bad.

```bash
xrandr
```

```bash 
// from Hyprland config
monitor = HDMI-A-1,  3840x2160@60, 0x0, 1
```

### Step 2: Capture a Screenshot with Grim
Use Grim to capture an exact region by specifying the geometry (coordinates and dimensions):

```bash
grim -s 1 -g "64,176 1920x1080" ~/screenshots/screenshot-$(date +%F_%T).png
```

#### Explanation of the Command:
- `-s 1`: Ensures a scaling factor of 1 (prevents HiDPI scaling issues).
- `-g "64,176 1920x1080"`:
  - `64,176`: Specifies the **x,y** coordinates of the top-left corner.
  - `1920x1080`: Specifies the **width x height** of the area to capture.
- `~/screenshots/screenshot-$(date +%F_%T).png`: Defines the output file path with a timestamp.

### Step 3: Convert to WebP
After capturing the screenshot, use ImageMagick to convert it to `.webp` format:

#### Lossless Conversion
For no quality loss:

```bash
magick convert ~/screenshots/screenshot-*.png -define webp:lossless=true ~/screenshots/screenshot-$(date +%F_%T).webp
```

#### High-Quality Lossy Conversion
For a smaller file size with minimal quality loss:

```bash
magick convert ~/screenshots/screenshot-*.png -quality 90 ~/screenshots/screenshot-$(date +%F_%T).webp
```

---

## Automating the Process

### Script for Fixed Parameter Screenshot and Conversion

1. Create a script file:

   ```bash
   nano ~/screenshot-automated.sh
   ```

2. Add the following content:

   ```bash
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
```

3. Make the script executable:

   ```bash
   chmod +x ~/screenshot-automated.sh
   ```

4. Run the script with predefined parameters:

   ```bash
   ./screenshot-automated.sh 64 176 1280 720
   ```

   This will take a screenshot starting at `64,176` with dimensions `1280x720`.

5. To use default parameters, simply run:

   ```bash
   ./screenshot-automated.sh
   ```

   This will use the default values: `64,176` as the top-left corner and `1920x1080` as dimensions.

---

## Notes

- Use `-s 1` in Grim to avoid scaling issues on HiDPI screens.
- Adjust quality settings (`-quality 90`) to balance file size and image quality for `.webp`.
- Ensure you use `magick convert` instead of `convert` to avoid deprecated warnings in ImageMagick v7.
- The script will now correctly construct geometry for Grim to prevent errors.

Enjoy seamless screenshots and efficient file conversions!

