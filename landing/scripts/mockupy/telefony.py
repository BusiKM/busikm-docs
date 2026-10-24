"""Składa makiety telefonu ze zrzutów symulatora iOS (dowolny iPhone, np. 1170x2532).

    python3 scripts/mockupy/telefony.py <katalog-zrzutow> public/mockups

W katalogu zrzutów oczekuje plików nazwanych jak ekran (np. `czas.png`).
Plan kompozycji jest w PLAN poniżej: który zrzut trafia do którego pliku
makiety i jak go ułożyć. Pojedynczy telefon stoi dokładnie tam, gdzie stał
w poprzednich makietach (962x1948 px w środku płótna 3200x2400), więc
wartości `imageScale` na stronie dalej pasują.

Ramka jest rysowana, nie wklejana: ciemny tytan, czarna ramka wokół ekranu,
wyspa dynamiczna, cień pod spodem. Dzięki temu nie zależymy od zewnętrznego
pliku ramki ani jego licencji.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFilter

SS = 3  # nadpróbkowanie przy rysowaniu krawędzi, potem zmniejszenie


def zaokraglona_maska(size, r):
    w, h = size
    m = Image.new('L', (w * SS, h * SS), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w * SS - 1, h * SS - 1), r * SS, fill=255)
    return m.resize(size, Image.LANCZOS)


def telefon(zrzut, wysokosc):
    """Telefon o zadanej wysokości (w px) z ekranem ze zrzutu, tło przezroczyste."""
    ekran = Image.open(zrzut).convert('RGBA')
    # Proporcje iPhone 17 Pro: ekran 1206x2622, ramka ~3,2% szerokości, tytan ~1%.
    H = wysokosc
    ramka = round(H * 0.0175)
    tytan = round(H * 0.0055)
    eh = H - 2 * (ramka + tytan)
    ew = round(eh * ekran.width / ekran.height)
    W = ew + 2 * (ramka + tytan)
    r_out = round(W * 0.155)
    r_scr = r_out - ramka - tytan

    out = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    # tytan: lekki gradient od ciemnego grafitu
    t = Image.new('RGBA', (W, H), (58, 60, 66, 255))
    grad = Image.linear_gradient('L').resize((W, H)).point(lambda v: 40 + v // 5)
    t = Image.composite(Image.new('RGBA', (W, H), (92, 95, 104, 255)), t, grad)
    out.paste(t, (0, 0), zaokraglona_maska((W, H), r_out))
    # czarna ramka ekranu
    czarna = Image.new('RGBA', (W - 2 * tytan, H - 2 * tytan), (8, 8, 10, 255))
    out.paste(czarna, (tytan, tytan), zaokraglona_maska(czarna.size, r_out - tytan))
    # ekran
    ekran = ekran.resize((ew, eh), Image.LANCZOS)
    out.paste(ekran, (tytan + ramka, tytan + ramka), zaokraglona_maska((ew, eh), r_scr))
    # wyspa dynamiczna
    d = ImageDraw.Draw(out)
    iw, ih = round(ew * 0.31), round(ew * 0.092)
    ix, iy = (W - iw) // 2, tytan + ramka + round(ew * 0.03)
    d.rounded_rectangle((ix, iy, ix + iw, iy + ih), ih // 2, fill=(0, 0, 0, 255))
    # przyciski boczne
    for y0, y1, x in ((0.18, 0.23, 0), (0.26, 0.33, 0), (0.35, 0.42, 0), (0.27, 0.37, W)):
        bx = -round(H * 0.003) if x == 0 else W - round(H * 0.0015)
        d.rounded_rectangle((bx, round(H * y0), bx + round(H * 0.0045), round(H * y1)), 3, fill=(70, 72, 78, 255))
    return out


def z_cieniem(img, rozmycie, przesuniecie, krycie=0.45):
    pad = rozmycie * 3
    w, h = img.size
    base = Image.new('RGBA', (w + 2 * pad, h + 2 * pad), (0, 0, 0, 0))
    a = img.split()[-1].point(lambda v: int(v * krycie))
    cien = Image.new('RGBA', img.size, (0, 0, 0, 255))
    cien.putalpha(a)
    base.paste(cien, (pad + przesuniecie[0], pad + przesuniecie[1]), cien)
    base = base.filter(ImageFilter.GaussianBlur(rozmycie))
    base.alpha_composite(img, (pad, pad))
    return base, pad


def poloz(plotno, img, srodek, kat=0, cien=(40, (0, 30))):
    if kat:
        img = img.rotate(kat, resample=Image.BICUBIC, expand=True)
    img, pad = z_cieniem(img, *cien)
    x = round(srodek[0] - img.width / 2)
    y = round(srodek[1] - img.height / 2)
    plotno.alpha_composite(img, (max(x, 0), max(y, 0)), (max(-x, 0), max(-y, 0)))


def pojedynczy(src, out):
    """Jak dotąd: telefon 1948 px wysokości na środku płótna 3200x2400."""
    p = Image.new('RGBA', (3200, 2400), (0, 0, 0, 0))
    poloz(p, telefon(src, 1948), (1603, 1200), cien=(36, (0, 28)))
    p.save(out, optimize=True)


def hero(src, out):
    """Duży telefon przycięty dolną krawędzią płótna 2400x1800."""
    p = Image.new('RGBA', (2400, 1800), (0, 0, 0, 0))
    t = telefon(src, 2200)
    poloz(p, t, (1202, 170 + t.height // 2), cien=(30, (0, 24)))
    p.save(out, optimize=True)


def para(src_lewy, src_prawy, out):
    """Dwa telefony, lewy przechylony w lewo, prawy w prawo, na 3200x2400."""
    p = Image.new('RGBA', (3200, 2400), (0, 0, 0, 0))
    poloz(p, telefon(src_lewy, 1800), (1240, 1215), kat=8)
    poloz(p, telefon(src_prawy, 1800), (1960, 1185), kat=-8)
    p.save(out, optimize=True)


def trojka(srcs, out):
    """Trzy telefony w wachlarzu na 1600x1200."""
    p = Image.new('RGBA', (1600, 1200), (0, 0, 0, 0))
    for src, (cx, cy), kat in zip(srcs, ((430, 640), (800, 600), (1170, 640)), (14, 0, -14)):
        poloz(p, telefon(src, 960), (cx, cy), kat=kat, cien=(22, (0, 18)))
    p.save(out, optimize=True)


def ciasny(src, out):
    """Telefon wypełniający kadr 1226x2064 (paragon na stronie kosztów)."""
    p = Image.new('RGBA', (1226, 2064), (0, 0, 0, 0))
    poloz(p, telefon(src, 1990), (613, 1025), cien=(14, (0, 10)))
    p.save(out, optimize=True)


# plik makiety -> (kompozycja, zrzuty)
PLAN = {
    'mockup-kierowca-zlecenia-phone.png': (pojedynczy, ['zlecenia']),
    'mockup-kierowca-nawigacja-phone.png': (pojedynczy, ['nawigacja']),
    'mockup-kierowca-koszt-phone.png': (pojedynczy, ['paragony']),
    'mockup-kierowca-czas-phone.png': (pojedynczy, ['czas']),
    'mockup-kierowca-wysylka-phone.png': (pojedynczy, ['wysylka']),
    'mockup-dokumenty-kierowca-phone.png': (pojedynczy, ['dokumenty']),
    'mockup-kierowca-hero-phone.png': (hero, ['start']),
    'mockup-kierowca-telefony-phone.png': (para, ['nawigacja', 'czas']),
    'mockup-kierowca-hero-trzy-phone.png': (trojka, ['czas', 'start', 'paragony']),
    'mockup-koszty-paragon-phone.png': (ciasny, ['paragony']),
}

if __name__ == '__main__':
    src_dir, out_dir = sys.argv[1:3]
    for plik, (fn, zrzuty) in PLAN.items():
        sciezki = [os.path.join(src_dir, f'{z}.png') for z in zrzuty]
        brak = [s for s in sciezki if not os.path.exists(s)]
        if brak:
            print(f'pomijam {plik}: brak {", ".join(os.path.basename(b) for b in brak)}')
            continue
        cel = os.path.join(out_dir, plik)
        if fn is para:
            fn(*sciezki, cel)
        elif fn is trojka:
            fn(sciezki, cel)
        else:
            fn(sciezki[0], cel)
        print(plik, os.path.getsize(cel) // 1024, 'KB')
