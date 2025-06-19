#!/bin/bash

# Create the composers directory if it doesn't exist
mkdir -p public/images/composers

# Function to download an image
download_image() {
    local url=$1
    local filename=$2
    local output_path="public/images/composers/$filename"
    
    echo "Downloading $filename..."
    curl -L "$url" -o "$output_path"
}

# Download composer portraits
# Using high-quality, public domain images from Wikimedia Commons

# Hildegard von Bingen
download_image "https://upload.wikimedia.org/wikipedia/commons/7/7a/Hildegard_von_Bingen.jpg" "hildegard.jpg"

# Béla Bartók
download_image "https://upload.wikimedia.org/wikipedia/commons/2/2a/B%C3%A9la_Bart%C3%B3k_1910.jpg" "bartok.jpg"

# Felix Mendelssohn
download_image "https://upload.wikimedia.org/wikipedia/commons/5/5f/Felix_Mendelssohn_1846.jpg" "mendelssohn.jpg"

# Ludwig van Beethoven
download_image "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg" "beethoven.jpg"

# Erik Satie
download_image "https://upload.wikimedia.org/wikipedia/commons/8/8c/Erik_Satie_1920.jpg" "satie.jpg"

# Modest Mussorgsky
download_image "https://upload.wikimedia.org/wikipedia/commons/2/2c/Modest_Mussorgsky.jpg" "mussorgsky.jpg"

# Daniel Pesca
download_image "https://www.danielpesca.com/wp-content/uploads/2018/08/Daniel-Pesca-Headshot.jpg" "pesca.jpg"

# Sergei Rachmaninoff
download_image "https://upload.wikimedia.org/wikipedia/commons/8/8c/Sergei_Rachmaninoff_cph.3a40575.jpg" "rachmaninoff.jpg"

# Piotr Ilyich Tchaikovsky
download_image "https://upload.wikimedia.org/wikipedia/commons/2/2c/Pyotr_Ilyich_Tchaikovsky_1893.jpg" "tchaikovsky.jpg"

# Johannes Brahms
download_image "https://upload.wikimedia.org/wikipedia/commons/2/2c/JohannesBrahms.jpg" "brahms.jpg"

# Maurice Ravel
download_image "https://upload.wikimedia.org/wikipedia/commons/2/2c/Maurice_Ravel_1925.jpg" "ravel.jpg"

# Andrew Lloyd Webber
download_image "https://upload.wikimedia.org/wikipedia/commons/8/8c/Andrew_Lloyd_Webber_2011_Shankbone.jpg" "webber.jpg"

# Edgar Meyer
download_image "https://upload.wikimedia.org/wikipedia/commons/7/7c/Edgar_Meyer_%28cropped%29.jpg" "meyer.jpg"

# Wolfgang Amadeus Mozart
download_image "https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg" "mozart.jpg"

# J.S. Bach
download_image "https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg" "bach.jpg"

# Eric Moore - Using a placeholder for now since the original URL is not accessible
download_image "https://upload.wikimedia.org/wikipedia/commons/4/4c/Portrait_placeholder.png" "moore.jpg"

echo "All composer portraits have been downloaded!" 