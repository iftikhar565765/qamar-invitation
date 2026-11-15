#!/bin/bash
# Mumtaz v2 — premium asset suite, all on pure white for the cutout pipeline.
set -u
RAW=/home/z/my-project/mumtaz-invitation/_raw-art
mkdir -p "$RAW"
cd /home/z/my-project/mumtaz-invitation

STYLE_MARBLE="honed Makrana marble, warm ivory cream stone, very faint soft grey veining, subtle warm undertone, matte satin finish, luxury stone surface, soft diffused museum light, minimal, seamless, no objects, no text, no border"
STYLE_INLAY="Mughal pietra dura stone-inlay illustration style, flat matte polished stone shapes set flush into ivory marble, fine hairline gold outline, muted jewel tones, refined delicate craftsmanship, absolutely no gloss, no 3D bevels, no jewelry look, flat elegant composition, isolated on pure white background, high detail"
STYLE_GOLD="fine antique gold leaf filigree, delicate hairline scrolls, matte muted gold, elegant thin lines, Mughal goldwork embroidery style, no shine, no 3D bevel, flat elegant composition, isolated on pure white background, high detail"

gen () { # name size prompt
  local name="$1" size="$2" prompt="$3"
  if [ -s "$RAW/$name.png" ]; then echo "skip $name"; return; fi
  echo "== $name"
  for attempt in 1 2 3 4 5 6; do
    if z-ai image -p "$prompt" -o "$RAW/$name.png" -s "$size" 2>&1 | grep -q 'File saved to'; then
      echo "ok $name"; sleep 20; return
    fi
    echo "retry $name (attempt $attempt)"; sleep 50
  done
  echo "FAILED $name"
}

# ---------- textures (full-bleed, not cut out) ----------
gen marble-texture 1440x720 "$STYLE_MARBLE"
gen marble-dusk 1440x720 "polished warm umber espresso brown marble surface in soft candlelight, subtle darker chocolate veining, deep bronze umber tones, faint warm glow low in the frame, matte finish, luxury stone surface, minimal, seamless, no objects, no text, no border"

# ---------- pietra dura sprigs ----------
gen sprig-carnelian 1024x1024 "one slender vertical spray of two Mughal carnelian red-orange poppy blossoms with jade green slender leaves and tiny gold buds, $STYLE_INLAY"
gen sprig-jade 1024x1024 "one slender vertical spray of two jade green Mughal blossoms with lapis blue accents and gold centres, small leaves, $STYLE_INLAY"
gen sprig-turquoise 1024x1024 "one slender horizontal spray of small turquoise stone buds with gold centres and delicate green leaves, $STYLE_INLAY"

# ---------- medallion ----------
gen medallion 1024x1024 "round pietra dura medallion, ring of small carnelian red, jade green and lapis blue stone blossoms around one central ivory lotus, inside a fine gold ring border, $STYLE_INLAY"

# ---------- gold ornaments ----------
gen gold-corner 1024x1024 "top-left corner ornament of two slender antique gold sprays with tiny blossoms curving gently inward, $STYLE_GOLD"
gen seal-gold 1024x1024 "round antique matte gold wax seal, embossed eight-petal lotus emblem at centre, fine beaded edge, slightly imperfect hand-poured wax edge, muted old gold, $STYLE_GOLD"

# ---------- organic ----------
gen petals 1024x1024 "scattered ivory cream rose petals with a few soft blush and antique gold petals lying flat, delicate soft matte illustration, muted warm tones, gently arranged around the edges of the frame leaving the centre empty, isolated on pure white background, high detail"
gen garland 1152x864 "slim hanging swag garland of ivory lotus petals and tiny gold beads curving in a gentle arc, small green leaves, Mughal embroidery style, muted cream and antique gold, $STYLE_GOLD"
gen cypress 768x1344 "two very slender dark sage green cypress trees standing side by side, tall narrow elegant Mughal charbagh garden gouache illustration, muted matte colours, soft painterly texture, isolated on pure white background, high detail"
gen finial 768x1344 "a single slender gilded dome finial: lotus bud above a thin crescent, fine line illustration with soft muted gold shading, $STYLE_GOLD"

echo ALL-DONE; ls -la "$RAW"
