"""Generate the five app-tile PNGs used by the Assignment 4 grid.

Each tile is an iOS-style rounded square with a simple white glyph, drawn at 4x
and downsampled so the edges stay smooth. Written from scratch so the project
ships its own artwork rather than copying any vendor's icon files.
"""

import math
import os
import sys

from PIL import Image, ImageDraw

SS = 4          # supersample factor
OUT = 512       # final tile size in px
S = OUT * SS    # working canvas size
RADIUS = int(S * 0.2237)   # iOS corner radius ratio


def new_layer():
    return Image.new("RGBA", (S, S), (0, 0, 0, 0))


def vertical_gradient(top, bottom):
    """A full-canvas vertical gradient from `top` to `bottom` (RGB tuples)."""
    grad = Image.new("RGB", (1, S))
    px = grad.load()
    for y in range(S):
        t = y / (S - 1)
        px[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    return grad.resize((S, S), Image.BILINEAR).convert("RGBA")


def tile(top, bottom):
    """A rounded-square tile filled with a vertical gradient."""
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], RADIUS, fill=255)
    base = new_layer()
    base.paste(vertical_gradient(top, bottom), (0, 0), mask)
    return base


def capsule(draw, p0, p1, width, fill):
    """A thick line with round caps, drawn as a rectangle plus two circles."""
    (x0, y0), (x1, y1) = p0, p1
    r = width / 2
    draw.line([x0, y0, x1, y1], fill=fill, width=int(width))
    for (cx, cy) in (p0, p1):
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)


def thick_arc(draw, cx, cy, radius, width, a0, a1, fill):
    """A stroked arc with round caps, stamped from overlapping circles."""
    r = width / 2
    steps = max(24, int(abs(a1 - a0) * 2))
    for i in range(steps + 1):
        a = math.radians(a0 + (a1 - a0) * i / steps)
        x = cx + radius * math.cos(a)
        y = cy + radius * math.sin(a)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=fill)


def rotated(layer, degrees):
    return layer.rotate(degrees, resample=Image.BICUBIC, center=(S / 2, S / 2))


def save(img, name, outdir):
    img.resize((OUT, OUT), Image.LANCZOS).save(os.path.join(outdir, name))
    print("wrote", name)


# --------------------------------------------------------------------------
# Calls — white handset on green
# --------------------------------------------------------------------------
def calls():
    img = tile((0x5B, 0xE5, 0x6B), (0x28, 0xC4, 0x3F))
    glyph = new_layer()
    d = ImageDraw.Draw(glyph)
    c = S / 2
    # The handset is an arc whose two ends are thickened into ear/mouth pieces.
    thick_arc(d, c, c, S * 0.205, S * 0.150, 112, 248, (255, 255, 255, 255))
    for ang in (112, 248):
        a = math.radians(ang)
        x = c + S * 0.205 * math.cos(a)
        y = c + S * 0.205 * math.sin(a)
        r = S * 0.112
        d.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, 255))
    # Mirrored so the handset leans the same way as the reference design:
    # earpiece to the upper right, mouthpiece to the lower left.
    img.alpha_composite(rotated(glyph, -45).transpose(Image.FLIP_LEFT_RIGHT))
    return img


# --------------------------------------------------------------------------
# Camera — dark camera body on a silver tile
# --------------------------------------------------------------------------
def camera():
    # Silver tile, light at the top and darker toward the bottom.
    img = tile((0xDE, 0xDE, 0xE2), (0x8C, 0x8C, 0x93))
    d = ImageDraw.Draw(img)
    dark = (0x33, 0x33, 0x36, 255)
    body = [S * 0.150, S * 0.330, S * 0.850, S * 0.765]
    # Viewfinder bump on the body's top-left shoulder.
    d.rounded_rectangle(
        [S * 0.280, S * 0.245, S * 0.510, S * 0.360], S * 0.042, fill=dark
    )
    d.rounded_rectangle(body, S * 0.110, fill=dark)
    # Lens: a light ring around a darker centre, so it reads as glass.
    cx, cy = S * 0.5, S * 0.550
    r = S * 0.165
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(0xC4, 0xC4, 0xC9, 255))
    r2 = r * 0.66
    d.ellipse([cx - r2, cy - r2, cx + r2, cy + r2], fill=dark)
    # Yellow flash dot, top right of the body.
    fx, fy, fr = S * 0.745, S * 0.408, S * 0.032
    d.ellipse([fx - fr, fy - fr, fx + fr, fy + fr], fill=(0xFF, 0xCC, 0x00, 255))
    return img


# --------------------------------------------------------------------------
# Messages — white speech bubble on green
# --------------------------------------------------------------------------
def messages():
    img = tile((0x5B, 0xE5, 0x6B), (0x28, 0xC4, 0x3F))
    glyph = new_layer()
    d = ImageDraw.Draw(glyph)
    w = (255, 255, 255, 255)
    d.ellipse([S * 0.155, S * 0.185, S * 0.845, S * 0.700], fill=w)
    # Tail, swept down and to the left out of the bubble.
    d.polygon(
        [
            (S * 0.345, S * 0.605),
            (S * 0.505, S * 0.620),
            (S * 0.215, S * 0.830),
        ],
        fill=w,
    )
    img.alpha_composite(glyph)
    return img


# --------------------------------------------------------------------------
# Music — white beamed notes on red
# --------------------------------------------------------------------------
def music():
    img = tile((0xFB, 0x5C, 0x74), (0xFA, 0x23, 0x3B))
    glyph = new_layer()
    d = ImageDraw.Draw(glyph)
    w = (255, 255, 255, 255)
    stem = S * 0.052
    left_x, right_x = S * 0.345, S * 0.675
    top_y, bottom_y = S * 0.255, S * 0.675
    capsule(d, (left_x, top_y + S * 0.075), (left_x, bottom_y), stem, w)
    capsule(d, (right_x, top_y), (right_x, bottom_y - S * 0.075), stem, w)
    # Beam joining the two stems, thicker at the top.
    d.polygon(
        [
            (left_x - stem / 2, top_y + S * 0.095),
            (right_x + stem / 2, top_y + S * 0.020),
            (right_x + stem / 2, top_y + S * 0.145),
            (left_x - stem / 2, top_y + S * 0.220),
        ],
        fill=w,
    )
    # Note heads: ellipses tilted the way a handwritten note head leans.
    for (hx, hy) in ((left_x, bottom_y), (right_x, bottom_y - S * 0.075)):
        head = new_layer()
        hd = ImageDraw.Draw(head)
        rx, ry = S * 0.105, S * 0.078
        hd.ellipse([S / 2 - rx, S / 2 - ry, S / 2 + rx, S / 2 + ry], fill=w)
        head = rotated(head, 18)
        # Shift the rotated head into place under the bottom of its stem.
        placed = new_layer()
        placed.paste(head, (int(hx - S / 2 - stem / 2), int(hy - S / 2)), head)
        glyph.alpha_composite(placed)
    img.alpha_composite(glyph)
    return img


# --------------------------------------------------------------------------
# Photos — coloured pinwheel on white
# --------------------------------------------------------------------------
def photos():
    img = tile((0xFF, 0xFF, 0xFF), (0xF2, 0xF2, 0xF5))
    glyph = new_layer()
    petal_colors = [
        (0xF8, 0xC9, 0x2E), (0xF2, 0x8B, 0x1F), (0xE8, 0x45, 0x3C),
        (0xE5, 0x3B, 0x8E), (0x9B, 0x51, 0xE0), (0x4A, 0x6C, 0xF0),
        (0x34, 0xB5, 0xE5), (0x3F, 0xC3, 0x6B),
    ]
    rx, ry = S * 0.085, S * 0.185
    offset = S * 0.145
    for i, color in enumerate(petal_colors):
        petal = new_layer()
        pd = ImageDraw.Draw(petal)
        pd.ellipse(
            [S / 2 - rx, S / 2 - offset - ry, S / 2 + rx, S / 2 - offset + ry],
            fill=color + (205,),
        )
        glyph.alpha_composite(rotated(petal, -i * (360 / len(petal_colors))))
    img.alpha_composite(glyph)
    return img


def main():
    outdir = sys.argv[1]
    os.makedirs(outdir, exist_ok=True)
    save(calls(), "calls.png", outdir)
    save(camera(), "camera.png", outdir)
    save(messages(), "messages.png", outdir)
    save(music(), "music.png", outdir)
    save(photos(), "photos.png", outdir)


if __name__ == "__main__":
    main()
