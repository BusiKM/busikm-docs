"""Wkłada zrzuty 1440x900@2x w ramkę MacBooka i zapisuje je jako makiety 2016x1270.

    python3 scripts/mockupy/wstaw-w-ramke.py scripts/mockupy/ramka-macbook.png <katalog-zrzutow> public/mockups

Zrzut `<nazwa>.png` trafia do `mockup-<nazwa>-desktop.png`. Ekran w ramce ma
1540x946 px od punktu (238, 76); zrzut 16:10 jest skalowany do szerokości
ekranu, a nadmiar (16 px) odcinany z dołu. Ramka ma w środku stary ekran —
skrypt zawsze go zakrywa.
"""
import sys, os
from PIL import Image
frame_path, src_dir, out_dir = sys.argv[1:4]
X, Y, SW, SH = 238, 76, 1540, 946
frame = Image.open(frame_path).convert('RGBA')
for f in sorted(os.listdir(src_dir)):
    if not f.endswith('.png'): continue
    shot = Image.open(os.path.join(src_dir, f)).convert('RGBA')
    s = max(SW / shot.width, SH / shot.height)
    shot = shot.resize((round(shot.width * s), round(shot.height * s)), Image.LANCZOS).crop((0, 0, SW, SH))
    out = frame.copy()
    out.paste(shot, (X, Y))
    name = f'mockup-{f[:-4]}-desktop.png'
    out.save(os.path.join(out_dir, name), optimize=True)
    print(name, os.path.getsize(os.path.join(out_dir, name)) // 1024, 'KB')
