import sys
try:
    from PIL import Image
    import math

    img = Image.open('d:/sanjbagh/public/assets/images/saanj-bagh-logo.jpg')
    img = img.convert('RGB')
    
    colors = img.getcolors(maxcolors=1000000)
    
    # Simple color quantization to find distinct peaks
    bins = {}
    for count, color in colors:
        # Quantize to 16 levels per channel to group similar colors
        r = (color[0] // 16) * 16
        g = (color[1] // 16) * 16
        b = (color[2] // 16) * 16
        k = (r, g, b)
        if k not in bins:
            bins[k] = {"count": 0, "r": 0, "g": 0, "b": 0}
        bins[k]["count"] += count
        bins[k]["r"] += count * color[0]
        bins[k]["g"] += count * color[1]
        bins[k]["b"] += count * color[2]
        
    sorted_bins = sorted(bins.values(), key=lambda x: x["count"], reverse=True)
    
    print("Distinct color clusters:")
    for b in sorted_bins[:5]:
        r = int(b["r"] / b["count"])
        g = int(b["g"] / b["count"])
        bl = int(b["b"] / b["count"])
        print(f"Count: {b['count']} -> RGB: ({r},{g},{bl}) -> #{r:02x}{g:02x}{bl:02x}")
except Exception as e:
    print(f"Error: {e}")
