import sys
try:
    from PIL import Image
    import math

    img = Image.open('d:/sanjbagh/public/assets/images/saanj-bagh-logo.jpg')
    img = img.convert('RGB')
    
    colors = img.getcolors(maxcolors=1000000)
    
    # Find the DARKEST colors
    darkest = sorted(colors, key=lambda x: sum(x[1]))
    
    print("Darkest colors (ink/stroke):")
    for count, color in darkest[:20]:
        print(f"Count: {count} -> RGB: {color} -> #{color[0]:02x}{color[1]:02x}{color[2]:02x}")

except Exception as e:
    print(f"Error: {e}")
