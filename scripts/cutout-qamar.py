#!/usr/bin/env python3
"""QAMAR — adaptive cutout pipeline.

The raw art is painted on neutral paper whose brightness wanders
(luminance 0.38–0.99, vignette + shadows), so a fixed "distance from
white" flood fill leaks (that is how the first pass left grey boxes).
What actually separates paper from paint in this art set is
SATURATION: paper is neutral (channel spread < 0.09) while every
gold/blue/rose stroke has spread >= 0.15. So:

  1. paper candidate  = neutral, not near-black
  2. outside          = flood fill from the borders
  3. interior pockets = ENCLOSED neutral regions inside the art
                        (niches, lantern panes, gaps between stars)
  4. feather, unmix against a blurred local paper field (kills the
     grey fringe), despeckle, trim, quantize
"""
import numpy as np
from PIL import Image
from scipy import ndimage
import os, sys

RAW = "/home/z/my-project/qamar-invitation/_raw-art"
OUT = "/home/z/my-project/qamar-invitation/assets/art"
DIAG = "/tmp/qcut"

NAVY = np.array([19, 26, 46], dtype=np.float32)


def on_navy(rgba_arr):
    a = rgba_arr[..., 3:4] / 255.0
    comp = rgba_arr[..., :3] * a + NAVY * (1 - a)
    return comp.astype(np.uint8)


def cutout(name, t_sat=0.09, interior=None, feather=0.9, maxdim=1100,
           colors=256, despeckle=150, field_flood=None, key_shadow=None,
           diag=False):
    img = Image.open(os.path.join(RAW, name + ".png")).convert("RGB")
    rgb = np.asarray(img).astype(np.float32) / 255.0
    h, w = rgb.shape[:2]
    lum = rgb.mean(axis=2)
    spread = rgb.max(axis=2) - rgb.min(axis=2)

    seed = np.zeros((h, w), bool)
    seed[0, :] = seed[-1, :] = seed[:, 0] = seed[:, -1] = True

    def paper_field(outside_mask):
        """blurred local paper colour, with a flat fallback where the
        blur has no paper to average (deep inside the art)"""
        weight = outside_mask.astype(np.float32)
        sig = max(h, w) / 24.0
        wb = ndimage.gaussian_filter(weight, sig)
        fld = np.empty_like(rgb)
        for c in range(3):
            fld[..., c] = ndimage.gaussian_filter(rgb[..., c] * weight, sig) / (wb + 1e-6)
        flat = np.median(rgb[outside_mask], axis=0) if outside_mask.any() else np.ones(3)
        fld = np.where((wb < 1e-3)[..., None], flat, fld)
        return np.clip(fld, 0, 1)

    # ── 1. paper: neutral, not near-black shadow floor ──────────
    paper = (spread < t_sat) & (lum > 0.32)

    # ── 2. flood fill from the frame edge ────────────────────────
    outside = paper & ndimage.binary_propagation(seed, mask=paper)
    a = np.where(outside, 0.0, 1.0)

    # ── 2b. second wave for cream-warm paper: some sheets mottle
    # towards ivory (spread up to .18 — fails the neutral test) but
    # stay close to the LOCAL paper field ────────────────────────
    if field_flood:
        t_field = field_flood
        field = paper_field(outside)
        dist_field = np.sqrt(((rgb - field) ** 2).sum(axis=2))
        paper2 = dist_field < t_field
        outside = paper2 & ndimage.binary_propagation(seed, mask=paper2)
        a = np.where(outside, 0.0, 1.0)

    # ── 2c. cast shadow on the sheet: the art drops a soft grey
    # shadow that is neutral but DIMMER than the paper test — flood
    # anything neutral-grey connected to the already-keyed paper so
    # it cannot survive as a smudge on the night sky ────────────
    if key_shadow:
        cand2 = (spread < key_shadow) & (lum > 0.12)
        outside = cand2 & ndimage.binary_propagation(outside, mask=cand2)
        a = np.where(outside, 0.0, 1.0)

    field = paper_field(outside)

    # ── 3. enclosed interior paper pockets ───────────────────────
    # interior forms: (t_sat_i, t_lum_i, min_area) neutral | ('field', t, min_area)
    if interior:
        if interior[0] == "field":
            dist_field = np.sqrt(((rgb - field) ** 2).sum(axis=2))
            cand = dist_field < interior[1]
            ramp = np.clip((lum - 0.55) / (0.94 - 0.55), 0, 1)
        else:
            t_sat_i, t_lum_i = interior[0], interior[1]
            cand = (spread < t_sat_i) & (lum > t_lum_i)
            ramp = np.clip((lum - t_lum_i) / (0.94 - t_lum_i), 0, 1)
        cand &= a > 0.5
        min_area = interior[-1]
        lab, n = ndimage.label(cand)
        if n:
            sizes = ndimage.sum(cand, lab, range(1, n + 1))
            big = [i + 1 for i, s in enumerate(sizes) if s >= min_area]
            for i in big:
                a = np.where(lab == i, np.minimum(a, ramp), a)

    # ── despeckle isolated specks (gold glitter), keep real stars ─
    lab, n = ndimage.label(a > 0.15)
    if n:
        sizes = ndimage.sum(a > 0.15, lab, range(1, n + 1))
        kill = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s < despeckle])
        a = np.where(kill, 0.0, a)

    # feather, then trim the far tail: a gaussian leaves <6% alpha over
    # the whole content box, which reads as a faint lighter rectangle
    # once composited on the night sky
    a = ndimage.gaussian_filter(a, feather)
    a = np.where(a < 0.06, 0.0, np.clip(a, 0, 1))

    # unmix each pixel against its local paper colour; never unmix all
    # the way on faint pixels — the 1/a amplification turns edge noise
    # into white speckle (the jagged halo)
    a_unmix = np.maximum(a, 0.3)[..., None]
    rgb_out = np.clip((rgb - (1.0 - a[..., None]) * field) / a_unmix, 0, 1)

    rgba = np.dstack([(rgb_out * 255).astype(np.uint8),
                      (a * 255).astype(np.uint8)])
    im = Image.fromarray(rgba)

    # trim to content, cap the long edge
    bbox = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    if bbox:
        im = im.crop(bbox)
    if max(im.size) > maxdim:
        s = maxdim / max(im.size)
        im = im.resize((round(im.size[0] * s), round(im.size[1] * s)), Image.LANCZOS)

    if diag:
        os.makedirs(DIAG, exist_ok=True)
        comp = on_navy(np.asarray(im))
        Image.fromarray(comp).save(os.path.join(DIAG, name + "-on-navy.png"))

    out_name = RECIPES.get(name, {}).get("out_name", name)
    ext = os.path.splitext(out_name)[1] or ".png"
    if ext == ".webp":
        im.save(os.path.join(OUT, out_name), "WEBP", quality=92, method=6)
    else:
        q = im.quantize(colors=colors, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG)
        q.save(os.path.join(OUT, out_name), "PNG", optimize=True)
    path = os.path.join(OUT, out_name)
    print(f"{name}: {im.size[0]}x{im.size[1]} -> {os.path.getsize(path)//1024}KB "
          f"(outside {outside.mean():.0%}, keyed {(a<0.5).mean():.0%})")


RECIPES = {
    "shamsa-qamar":  dict(interior=(0.08, 0.58, 400), t_sat=0.09),
    "crescent-qamar": dict(interior=(0.08, 0.60, 300), t_sat=0.09),
    "dome-qamar":    dict(interior=(0.08, 0.60, 300), t_sat=0.09),
    "lantern-qamar": dict(interior=(0.08, 0.55, 300), t_sat=0.09),
    "roses-qamar":   dict(interior=(0.07, 0.68, 120), t_sat=0.09),   # ivory petals stay saturated; paper pockets key
    # cream-warm mottled sheet: the neutral test misses ivory patches,
    # so the divider floods a second time against the local paper field
    "divider-qamar": dict(interior=("field", 0.11, 120), t_sat=0.09,
                          field_flood=0.11, feather=0.7, maxdim=1400, despeckle=120),
    # the wax seal: solid medallion on bright neutral paper. No interior
    # pockets — the bead-ring recesses must stay opaque — and a slightly
    # wider feather so the rim edge is smooth on the night sky.
    "seal-qamar": dict(interior=None, t_sat=0.09, feather=1.1, maxdim=800,
                       despeckle=250, key_shadow=0.12,
                       out_name="seal-qamar.webp"),
}


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    diag = "--diag" in sys.argv
    for name in (args or list(RECIPES)):
        kw = dict(RECIPES.get(name, {}))
        kw.pop("out_name", None)
        cutout(name, **kw, diag=diag)
