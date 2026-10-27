#!/usr/bin/env python3
"""
Tidelyne Prep logo generator
============================
The mark is a sibling of the Tidelyne mark: the same navy rounded badge and three waves
(white swell, cyan waterline, deep-cyan swell), with one change: the waves climb to the
right. Prep is Tidelyne's "rising" line.

    python3 scripts/make-logo.py        # writes public/icons/*; `node scripts/build-pages.js` copies them to docs/icons/

Outputs:
    icon.svg                 the mark alone (favicon, any size)
    icon-192.png             Android / PWA
    icon-512.png             Android / PWA splash
    icon-maskable-192.png    maskable (full-bleed, waves inside the safe zone)
    icon-maskable-512.png
    apple-touch-icon.png     iOS home screen (180 px, opaque, full-bleed: iOS masks its own corners)

Keep WAVES and TILT identical to brandMark() in docs/app.js so the in-app mark matches the icons.
"""
import math
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'icons')

NAVY = (8, 21, 38)
CYAN = (0, 212, 255)
CYAN_D = (0, 140, 180)
WHITE = (238, 243, 248)

# (y offset, amplitude, thickness, colour) as fractions of the badge size, top to bottom.
WAVES = [
    (-0.155, 0.052, 0.055, WHITE),
    (0.020, 0.070, 0.082, CYAN),
    (0.190, 0.052, 0.055, CYAN_D),
]
TILT = 0.10  # how far (in badge units) the right end of each wave sits above its left end


def wave_points(size, y_off, amp, scale=1.0, steps=600):
    w = size * 0.62 * scale
    cx = size / 2
    cy = size / 2 + size * y_off * scale
    pts = []
    for i in range(steps + 1):
        t = i / steps
        x = cx - w / 2 + w * t
        y = cy + math.sin(t * math.pi * 2) * size * amp * scale - (t - 0.5) * size * TILT * scale
        pts.append((x, y))
    return pts


def draw_waves(d, S, scale=1.0):
    # Stamp overlapping discs along each curve: smooth stroke, round caps, no joint notches.
    for y_off, amp, thick, col in WAVES:
        rr = S * thick * scale / 2
        for px, py in wave_points(S, y_off, amp, scale):
            d.ellipse([px - rr, py - rr, px + rr, py + rr], fill=col)


def mark(size, rounded=True, scale=1.0, ss=4):
    S = size * ss
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if rounded:
        r = int(S * 0.22)
        d.rounded_rectangle([0, 0, S - 1, S - 1], radius=r, fill=NAVY)
        d.rounded_rectangle([0, 0, S - 1, S - 1], radius=r, outline=(0, 212, 255, 70), width=max(1, int(S * 0.012)))
    else:
        d.rectangle([0, 0, S, S], fill=NAVY)
    draw_waves(d, S, scale)
    return img.resize((size, size), Image.LANCZOS)


def svg_path(size, y_off, amp, steps=48):
    return 'M ' + ' L '.join('%.1f %.1f' % (x, y) for x, y in wave_points(size, y_off, amp, steps=steps))


def write_svg(path, size=128):
    strokes = []
    for y_off, amp, thick, col in WAVES:
        hexc = '#%02x%02x%02x' % col
        strokes.append('  <path d="%s" fill="none" stroke="%s" stroke-width="%.1f" stroke-linecap="round"/>' % (svg_path(size, y_off, amp), hexc, size * thick))
    r = size * 0.22
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d">\n'
        '  <title>Tidelyne Prep</title>\n'
        '  <rect width="%d" height="%d" rx="%.1f" fill="#081526"/>\n'
        '  <rect x="1" y="1" width="%d" height="%d" rx="%.1f" fill="none" stroke="#00d4ff" stroke-opacity="0.3" stroke-width="2"/>\n'
        '%s\n</svg>\n'
    ) % (size, size, size, size, size, size, r, size - 2, size - 2, r, '\n'.join(strokes))
    with open(path, 'w') as f:
        f.write(svg)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    write_svg(os.path.join(OUT, 'icon.svg'))
    mark(192).save(os.path.join(OUT, 'icon-192.png'), 'PNG', optimize=True)
    mark(512).save(os.path.join(OUT, 'icon-512.png'), 'PNG', optimize=True)
    mark(192, rounded=False, scale=0.8).save(os.path.join(OUT, 'icon-maskable-192.png'), 'PNG', optimize=True)
    mark(512, rounded=False, scale=0.8).save(os.path.join(OUT, 'icon-maskable-512.png'), 'PNG', optimize=True)
    touch = Image.new('RGB', (180, 180), NAVY)
    waves = mark(180, rounded=False)
    touch.paste(waves, (0, 0), waves)
    touch.save(os.path.join(OUT, 'apple-touch-icon.png'), 'PNG', optimize=True)
    print('Wrote icon.svg, icon-192.png, icon-512.png, icon-maskable-192.png, icon-maskable-512.png, apple-touch-icon.png to', os.path.relpath(OUT))
