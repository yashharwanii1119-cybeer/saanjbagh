from PIL import Image

try:
    img = Image.open('d:/sanjbagh/public/assets/images/saanj-bagh-logo.jpg')
    img = img.convert('RGB')
    
    # Get image dimensions
    width, height = img.size
    
    # Crop to the center 10% to target the flower itself
    left = width * 0.45
    top = height * 0.45
    right = width * 0.55
    bottom = height * 0.55
    cropped = img.crop((left, top, right, bottom))
    
    colors = cropped.getcolors(maxcolors=1000000)
    if colors:
        colors.sort(key=lambda x: x[0], reverse=True)
        print("Center Top colors (count, (R,G,B)):")
        for count, color in colors[:30]:
            print(f"{count}: {color} -> #{color[0]:02x}{color[1]:02x}{color[2]:02x}")
    else:
        print("Too many colors to count.")
except Exception as e:
    print(f"Error: {e}")
