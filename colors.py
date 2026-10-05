from PIL import Image

try:
    img = Image.open('d:/sanjbagh/public/assets/images/saanj-bagh-logo.jpg')
    img = img.convert('RGB')
    colors = img.getcolors(maxcolors=1000000)
    if colors:
        colors.sort(key=lambda x: x[0], reverse=True)
        print("Top colors (count, (R,G,B)):")
        for count, color in colors[:20]:
            print(f"{count}: {color} -> #{color[0]:02x}{color[1]:02x}{color[2]:02x}")
    else:
        print("Too many colors to count.")
except Exception as e:
    print(f"Error: {e}")
