#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/composers
mkdir -p public/images/composers/thumbnails

# Function to download and process an image
download_image() {
    local url=$1
    local filename=$2
    local output_path="public/images/composers/$filename"
    local thumbnail_path="public/images/composers/thumbnails/$filename"
    
    echo "Downloading $filename..."
    
    # Download the image
    curl -L "$url" -o "$output_path"
    
    # Create thumbnail using Next.js Image optimization
    cp "$output_path" "$thumbnail_path"
    
    echo "Processed $filename"
}

# Download composer portraits
download_image "https://upload.wikimedia.org/wikipedia/commons/6/66/Bart%C3%B3k_B%C3%A9la_1927.jpg" "bartok.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/5/5f/Felix_Mendelssohn_Bartholdy_3.jpg" "mendelssohn.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/6/6b/Erik_Satie_by_Brassai_1920s.jpg" "satie.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/2/2b/Modest_Mussorgsky_1870.jpg" "mussorgsky.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/8/86/Sergei_Rachmaninoff_LOC_30160_cropped.jpg" "rachmaninoff.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/d/db/Tchaikovsky%2C_head-and-shoulders_portrait.jpg" "tchaikovsky.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/1/15/JohannesBrahms.jpg" "brahms.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/7/78/Maurice_Ravel_1925.jpg" "ravel.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg" "beethoven.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg" "mozart.jpg"
download_image "https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg" "bach.jpg"

echo "All images downloaded and processed!" 