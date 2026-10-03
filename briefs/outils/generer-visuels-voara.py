# Génère les visuels de la campagne Voara et les planches de présentation.
# Usage : python generer-visuels-voara.py <dossier-polices> <dossier-du-site>
# Demande Pillow et les polices variables Cormorant Garamond (romain et italique) et Jost,
# à télécharger depuis https://github.com/google/fonts (dossiers ofl/cormorantgaramond et ofl/jost).
import math
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONTS, SITE = sys.argv[1], sys.argv[2]

NOIR, IVOIRE, SABLE, OR, AMBRE = (30, 40, 35), (244, 239, 231), (216, 200, 180), (184, 155, 106), (138, 90, 59)

_cache = {}


def police(nom, taille):
    """nom : cg-light, cg-regular, cg-italic, jost-light, jost-regular"""
    cle = (nom, taille)
    if cle not in _cache:
        fichier, variante = {
            'cg-light': ('CormorantGaramond[wght].ttf', b'Light'),
            'cg-regular': ('CormorantGaramond[wght].ttf', b'Regular'),
            'cg-italic': ('CormorantGaramond-Italic[wght].ttf', b'Light Italic'),
            'jost-light': ('Jost[wght].ttf', b'Light'),
            'jost-regular': ('Jost[wght].ttf', b'Regular'),
        }[nom]
        f = ImageFont.truetype(os.path.join(FONTS, fichier), taille)
        f.set_variation_by_name(variante)
        _cache[cle] = f
    return _cache[cle]


def largeur(texte, f, approche=0.0):
    if not approche:
        return f.getlength(texte)
    pas = approche * f.size
    return sum(f.getlength(c) for c in texte) + pas * (len(texte) - 1)


def ligne(d, cx, y, segments):
    """Écrit une ligne centrée sur cx, ligne de base à y.
    segments : [(texte, police, couleur, approche_en_em)]"""
    total = sum(largeur(t, f, a) for t, f, c, a in segments)
    x = cx - total / 2
    for t, f, c, a in segments:
        if a:
            pas = a * f.size
            for ch in t:
                d.text((x, y), ch, font=f, fill=c, anchor='ls')
                x += f.getlength(ch) + pas
            x -= pas
        else:
            d.text((x, y), t, font=f, fill=c, anchor='ls')
            x += f.getlength(t)
    return total


def filet(d, cx, y, long=104, ep=2, couleur=OR):
    d.rectangle([cx - long / 2, y, cx + long / 2, y + ep - 1], fill=couleur)


def signature(d, cx, y, couleur, taille=36):
    ligne(d, cx, y, [('VOARA', police('cg-regular', taille), couleur, 0.42)])


def degrade_h(w, h, arrets):
    """Dégradé horizontal. arrets : [(position 0..1, (r, g, b))]"""
    im = Image.new('RGB', (w, 1))
    px = im.load()
    for x in range(w):
        t = x / max(1, w - 1)
        for (p0, c0), (p1, c1) in zip(arrets, arrets[1:]):
            if p0 <= t <= p1:
                k = (t - p0) / (p1 - p0) if p1 > p0 else 0
                px[x, 0] = tuple(round(c0[i] + (c1[i] - c0[i]) * k) for i in range(3))
                break
    return im.resize((w, h))


def halo(taille, centre, rayons, couleur, flou):
    calque = Image.new('RGBA', taille, (0, 0, 0, 0))
    d = ImageDraw.Draw(calque)
    cx, cy = centre
    rx, ry = rayons
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=couleur)
    return calque.filter(ImageFilter.GaussianBlur(flou))


def flacon(hauteur):
    """Flacon compte-gouttes en verre ambré, image RGBA de la hauteur demandée."""
    k = 3  # suréchantillonnage
    H = hauteur * k
    u = H / 168.0  # unité du dessin d'origine (78 x 168)
    W = round(78 * u)
    im = Image.new('RGBA', (W, round(H)), (0, 0, 0, 0))

    def bloc(x, y, w, h, r, arrets):
        g = degrade_h(max(2, round(w * u)), max(2, round(h * u)), arrets).convert('RGBA')
        m = Image.new('L', g.size, 0)
        ImageDraw.Draw(m).rounded_rectangle([0, 0, g.size[0] - 1, g.size[1] - 1], radius=round(r * u), fill=255)
        im.paste(g, (round(x * u), round(y * u)), m)

    noir_mat = [(0, (10, 13, 12)), (0.25, (44, 52, 48)), (0.5, (20, 25, 23)), (1, (6, 8, 7))]
    bloc(30, 2, 18, 30, 6, noir_mat)                    # poire du compte-gouttes
    bloc(25, 29, 28, 15, 2.5, noir_mat)                 # bague
    bloc(9, 43, 60, 115, 11, [(0, (74, 44, 26)), (0.16, (176, 122, 80)), (0.34, (146, 96, 62)),
                              (0.78, (112, 70, 42)), (1, (70, 42, 25))])  # corps ambré
    d = ImageDraw.Draw(im)
    # reflet vertical sur le verre
    reflet = Image.new('RGBA', im.size, (0, 0, 0, 0))
    ImageDraw.Draw(reflet).rounded_rectangle([round(14 * u), round(52 * u), round(18.5 * u), round(150 * u)],
                                             radius=round(2 * u), fill=(255, 235, 210, 70))
    im.alpha_composite(reflet.filter(ImageFilter.GaussianBlur(1.2 * u)))
    # étiquette
    x0, y0, x1, y1 = round(17 * u), round(82 * u), round(61 * u), round(134 * u)
    d.rectangle([x0, y0, x1, y1], fill=IVOIRE)
    d.rectangle([x0 + round(2 * u), y0 + round(2 * u), x1 - round(2 * u), y1 - round(2 * u)], outline=OR, width=max(1, round(0.25 * u)))
    cx = (x0 + x1) / 2
    ligne(d, cx, y0 + 19 * u, [('VOARA', police('cg-regular', round(6.2 * u)), NOIR, 0.3)])
    d.rectangle([cx - 5 * u, y0 + 24 * u, cx + 5 * u, y0 + 24 * u + max(1, round(0.25 * u))], fill=OR)
    ligne(d, cx, y0 + 32 * u, [('SÉRUM ÉCLAT', police('jost-regular', round(2.6 * u)), NOIR, 0.22)])
    ligne(d, cx, y0 + 37.5 * u, [('BAOBAB', police('jost-regular', round(2.6 * u)), AMBRE, 0.22)])
    ligne(d, cx, y0 + 45.5 * u, [('30 ml', police('jost-light', round(2.4 * u)), NOIR, 0.1)])
    return im.resize((round(W / k), hauteur), Image.LANCZOS)


def poser_flacon(im, cx, bas, hauteur, sombre=True):
    f = flacon(hauteur)
    w = f.size[0]
    if sombre:
        im.alpha_composite(halo(im.size, (cx, bas - hauteur * 0.55), (hauteur * 0.62, hauteur * 0.62), (70, 92, 80, 150), hauteur * 0.22))
    ombre = (0, 0, 0, 150) if sombre else (60, 40, 25, 90)
    im.alpha_composite(halo(im.size, (cx + w * 0.10, bas - hauteur * 0.004), (w * 0.62, hauteur * 0.035), ombre, hauteur * 0.02))
    im.alpha_composite(f, (round(cx - w / 2), bas - hauteur))


def goutte(taille_r):
    """Goutte d'huile ambrée, image RGBA."""
    k = 3
    r = taille_r * k
    d_apex = 2.35 * r
    w, h = round(2 * r + 8 * k), round(r + d_apex + 8 * k)
    cx, cy = w / 2, h - r - 4 * k
    alpha = math.asin(r / d_apex)
    pts = [(cx, cy - d_apex)]
    debut = -math.pi / 2 + (math.pi / 2 - alpha)  # point de tangence droit
    n = 140
    for i in range(n + 1):
        a = debut + (2 * math.pi - 2 * (math.pi / 2 - alpha)) * i / n
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    masque = Image.new('L', (w, h), 0)
    ImageDraw.Draw(masque).polygon(pts, fill=255)
    masque = masque.filter(ImageFilter.GaussianBlur(k * 0.8))
    corps = degrade_h(w, h, [(0, (168, 110, 68)), (0.42, (186, 128, 82)), (1, (128, 80, 48))]).convert('RGBA')
    eclat = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(eclat).ellipse([cx - r * 0.66, cy - r * 0.42, cx - r * 0.50, cy + r * 0.34], fill=(255, 240, 215, 0))
    corps.alpha_composite(eclat.filter(ImageFilter.GaussianBlur(r * 0.05)))
    corps.putalpha(masque)
    return corps.resize((round(w / k), round(h / k)), Image.LANCZOS)


def toile(w, h, fond):
    return Image.new('RGBA', (w, h), fond + (255,))


# ---------------------------------------------------------------- visuels
def post1():
    im = toile(1080, 1350, NOIR)
    poser_flacon(im, 540, 800, 590)
    d = ImageDraw.Draw(im)
    ligne(d, 540, 130, [('NOUVEAU', police('jost-regular', 28), OR, 0.34)])
    ligne(d, 540, 960, [("L'éclat vient ", police('cg-light', 104), IVOIRE, 0), ('de loin.', police('cg-italic', 104), IVOIRE, 0)])
    filet(d, 540, 1010)
    ligne(d, 540, 1078, [('Sérum Éclat Baobab  ·  30 ml', police('jost-light', 32), IVOIRE, 0.08)])
    signature(d, 540, 1262, IVOIRE)
    return im


def post2():
    im = toile(1080, 1350, IVOIRE)
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 1080, 610], fill=SABLE)
    d.ellipse([540 - 215, 305 - 215, 540 + 215, 305 + 215], outline=OR, width=2)
    g = goutte(92)
    im.alpha_composite(halo(im.size, (552, 458), (96, 14), (70, 45, 25, 80), 14))
    im.alpha_composite(g, (round(540 - g.size[0] / 2), 150))
    ligne(d, 540, 730, [("L'INGRÉDIENT", police('jost-regular', 28), AMBRE, 0.34)])
    ligne(d, 540, 870, [('Huile de ', police('cg-light', 108), NOIR, 0), ('baobab', police('cg-italic', 108), NOIR, 0)])
    filet(d, 540, 920)
    f = police('jost-regular', 28)
    mots, esp = ['NOURRIT', 'PROTÈGE', 'ILLUMINE'], 44
    total = sum(largeur(m, f, 0.22) for m in mots) + esp * 2 * (len(mots) - 1)
    x = 540 - total / 2
    for i, m in enumerate(mots):
        wm = largeur(m, f, 0.22)
        ligne(d, x + wm / 2, 1000, [(m, f, NOIR, 0.22)])
        x += wm + esp
        if i < len(mots) - 1:
            d.rectangle([x, 974, x + 1, 1004], fill=OR)
            x += esp
    signature(d, 540, 1262, NOIR)
    return im


def post3():
    im = toile(1080, 1350, NOIR)
    im.alpha_composite(halo(im.size, (540, 620), (420, 300), (56, 74, 64, 120), 170))
    d = ImageDraw.Draw(im)
    ligne(d, 540, 130, [('NOTRE ENGAGEMENT', police('jost-regular', 28), OR, 0.34)])
    ligne(d, 540, 760, [('92', police('cg-light', 430), OR, 0), (' %', police('cg-light', 180), OR, 0)])
    filet(d, 540, 850)
    ligne(d, 540, 945, [("D'INGRÉDIENTS", police('jost-light', 34), IVOIRE, 0.2)])
    ligne(d, 540, 1003, [("D'ORIGINE NATURELLE", police('jost-light', 34), IVOIRE, 0.2)])
    signature(d, 540, 1262, IVOIRE)
    return im


def story():
    im = toile(1080, 1920, NOIR)
    poser_flacon(im, 540, 1190, 760)
    d = ImageDraw.Draw(im)
    signature(d, 540, 345, IVOIRE, 38)
    ligne(d, 540, 1310, [('SÉRUM ÉCLAT BAOBAB', police('jost-regular', 28), OR, 0.34)])
    ligne(d, 540, 1425, [('Votre nouveau geste', police('cg-light', 104), IVOIRE, 0)])
    ligne(d, 540, 1530, [('du matin', police('cg-italic', 104), IVOIRE, 0)])
    d.rectangle([540 - 190, 1580, 540 + 190, 1658], outline=IVOIRE, width=2)
    ligne(d, 540, 1629, [('DÉCOUVRIR', police('jost-regular', 26), IVOIRE, 0.3)])
    return im


def vue(numero, titre, lignes, sombre):
    fond, texte = (NOIR, IVOIRE) if sombre else (IVOIRE, NOIR)
    im = toile(1080, 1350, fond)
    d = ImageDraw.Draw(im)
    d.rectangle([0, 837, 1080, 838], fill=OR)
    if numero is None:
        ligne(d, 540, 130, [('LA ROUTINE', police('jost-regular', 28), OR, 0.34)])
        ligne(d, 540, 500, [('Votre matin en', police('cg-light', 112), texte, 0)])
        ligne(d, 540, 620, [('3 gestes', police('cg-italic', 112), texte, 0)])
        ligne(d, 540, 960, [('FAITES DÉFILER', police('jost-regular', 26), OR, 0.34)])
    else:
        ligne(d, 540, 400, [(numero, police('cg-italic', 230), OR if sombre else AMBRE, 0)])
        ligne(d, 540, 580, [(titre, police('cg-light', 100), texte, 0)])
        for i, t in enumerate(lignes):
            ligne(d, 540, 950 + i * 56, [(t, police('jost-light', 36), texte, 0.04)])
    signature(d, 540, 1262, texte)
    return im


# ---------------------------------------------------------------- planches
def avec_ombre(planche, visuel, x, y, flou=28, alpha=70):
    w, h = visuel.size
    ombre = Image.new('RGBA', planche.size, (0, 0, 0, 0))
    ImageDraw.Draw(ombre).rectangle([x + 6, y + 22, x + w - 6, y + h + 22], fill=(40, 30, 20, alpha))
    planche.alpha_composite(ombre.filter(ImageFilter.GaussianBlur(flou)))
    planche.alpha_composite(visuel, (x, y))


def couverture():
    im = toile(2048, 1366, NOIR)
    poser_flacon(im, 620, 1150, 900)
    d = ImageDraw.Draw(im)
    cx = 1390
    ligne(d, cx, 400, [('NOUVEAU', police('jost-regular', 38), OR, 0.34)])
    ligne(d, cx, 610, [("L'éclat vient", police('cg-light', 168), IVOIRE, 0)])
    ligne(d, cx, 780, [('de loin.', police('cg-italic', 168), IVOIRE, 0)])
    filet(d, cx, 850, 150, 3)
    ligne(d, cx, 940, [('Sérum Éclat Baobab  ·  30 ml', police('jost-light', 44), IVOIRE, 0.08)])
    signature(d, cx, 1120, IVOIRE, 52)
    return im


def planche1():
    im = toile(2048, 1366, IVOIRE)
    d = ImageDraw.Draw(im)
    ligne(d, 470, 200, [('DIRECTION ARTISTIQUE', police('jost-regular', 26), AMBRE, 0.34)])
    ligne(d, 470, 690, [('VOARA', police('cg-regular', 132), NOIR, 0.42)])
    filet(d, 470, 760, 150, 3)
    ligne(d, 470, 840, [('BOTANIQUE DE MADAGASCAR', police('jost-regular', 26), AMBRE, 0.34)])
    d.rectangle([900, 150, 901, 1216], fill=(226, 216, 201))
    couleurs = [('Noir végétal', '#1E2823', NOIR), ('Ivoire', '#F4EFE7', IVOIRE), ('Sable', '#D8C8B4', SABLE),
                ('Or champagne', '#B89B6A', OR), ('Ambre', '#8A5A3B', AMBRE)]
    x = 990
    for nom, code, c in couleurs:
        d.rectangle([x, 190, x + 170, 470], fill=c, outline=(226, 216, 201))
        d.text((x, 498), nom, font=police('jost-regular', 24), fill=NOIR)
        d.text((x, 532), code, font=police('jost-light', 22), fill=AMBRE)
        x += 194
    d.text((990, 640), 'Aa', font=police('cg-light', 250), fill=NOIR)
    d.text((1330, 720), 'Cormorant Garamond', font=police('cg-light', 66), fill=NOIR)
    d.text((1332, 806), 'TITRES  ·  LIGHT ET ITALIQUE', font=police('jost-regular', 22), fill=AMBRE)
    d.text((1000, 930), 'Aa', font=police('jost-light', 200), fill=NOIR)
    d.text((1330, 990), 'Jost', font=police('jost-light', 62), fill=NOIR)
    d.text((1332, 1076), 'TEXTES ET ÉTIQUETTES  ·  LIGHT ET REGULAR', font=police('jost-regular', 22), fill=AMBRE)
    return im


def planche2(posts):
    im = toile(2048, 1366, SABLE)
    d = ImageDraw.Draw(im)
    ligne(d, 1024, 190, [('TROIS POSTS INSTAGRAM', police('jost-regular', 26), NOIR, 0.34)])
    w, h, esp = 520, 650, 70
    x = (2048 - (3 * w + 2 * esp)) // 2
    for p in posts:
        avec_ombre(im, p.resize((w, h), Image.LANCZOS), x, 330)
        x += w + esp
    ligne(d, 1024, 1150, [('1080 × 1350 px', police('jost-light', 28), NOIR, 0.14)])
    return im


def planche3(st):
    im = toile(2048, 1366, SABLE)
    d = ImageDraw.Draw(im)
    cx = 610
    ligne(d, cx, 470, [('STORY INSTAGRAM', police('jost-regular', 26), AMBRE, 0.34)])
    ligne(d, cx, 640, [('Un geste, ', police('cg-light', 132), NOIR, 0), ('une story', police('cg-italic', 132), NOIR, 0)])
    filet(d, cx, 700, 150, 3)
    ligne(d, cx, 800, [('Texte et bouton dans le tiers bas,', police('jost-light', 34), NOIR, 0.04)])
    ligne(d, cx, 852, [("hors des zones couvertes par l'interface.", police('jost-light', 34), NOIR, 0.04)])
    ligne(d, cx, 960, [('1080 × 1920 px', police('jost-light', 28), NOIR, 0.14)])
    ew, eh = 558, 992
    px, py = 1340, (1366 - eh - 44) // 2
    ombre = Image.new('RGBA', im.size, (0, 0, 0, 0))
    ImageDraw.Draw(ombre).rounded_rectangle([px - 10, py + 20, px + ew + 54, py + eh + 74], radius=84, fill=(40, 30, 20, 110))
    im.alpha_composite(ombre.filter(ImageFilter.GaussianBlur(36)))
    k = 3
    tel = Image.new('RGBA', ((ew + 44) * k, (eh + 44) * k), (0, 0, 0, 0))
    ImageDraw.Draw(tel).rounded_rectangle([0, 0, tel.size[0] - 1, tel.size[1] - 1], radius=84 * k, fill=(14, 16, 15, 255))
    tel = tel.resize((ew + 44, eh + 44), Image.LANCZOS)
    im.alpha_composite(tel, (px, py))
    ecran = st.resize((ew, eh), Image.LANCZOS)
    masque = Image.new('L', (ew * k, eh * k), 0)
    ImageDraw.Draw(masque).rounded_rectangle([0, 0, ew * k - 1, eh * k - 1], radius=64 * k, fill=255)
    ecran.putalpha(masque.resize((ew, eh), Image.LANCZOS))
    im.alpha_composite(ecran, (px + 22, py + 22))
    ImageDraw.Draw(im).rounded_rectangle([px + 22 + ew // 2 - 70, py + 40, px + 22 + ew // 2 + 70, py + 68], radius=14, fill=(14, 16, 15))
    return im


def planche4(vues):
    im = toile(2048, 1366, IVOIRE)
    d = ImageDraw.Draw(im)
    ligne(d, 1024, 200, [('CARROUSEL  ·  4 VUES', police('jost-regular', 26), AMBRE, 0.34)])
    w, h, esp = 440, 550, 8
    x0 = (2048 - (4 * w + 3 * esp)) // 2
    ombre = Image.new('RGBA', im.size, (0, 0, 0, 0))
    ImageDraw.Draw(ombre).rectangle([x0 + 8, 380 + 24, x0 + 4 * w + 3 * esp - 8, 380 + h + 24], fill=(40, 30, 20, 70))
    im.alpha_composite(ombre.filter(ImageFilter.GaussianBlur(30)))
    for i, v in enumerate(vues):
        im.alpha_composite(v.resize((w, h), Image.LANCZOS), (x0 + i * (w + esp), 380))
    ligne(d, 1024, 1080, [("Le filet d'or se prolonge d'une vue à l'autre.", police('jost-light', 32), NOIR, 0.04)])
    ligne(d, 1024, 1140, [('1080 × 1350 px', police('jost-light', 28), NOIR, 0.14)])
    return im


# ---------------------------------------------------------------- export
def grain(im, sigma=3.5):
    """Ajoute un grain très fin, centré sur zéro : supprime les bandes des dégradés."""
    from PIL import ImageChops
    bruit = Image.effect_noise(im.size, sigma).convert('RGB')
    return ImageChops.add(im.convert('RGB'), bruit, 1, -128)


def enregistrer(im, chemin, qualite=90, taille=None):
    os.makedirs(os.path.dirname(chemin), exist_ok=True)
    out = grain(im)
    if taille:
        out = out.resize(taille, Image.LANCZOS)
    out.save(chemin, 'WEBP', quality=qualite, method=6)
    print(f"{os.path.getsize(chemin) // 1024:>4} Ko  {out.size}  {os.path.relpath(chemin, SITE)}")


posts = [post1(), post2(), post3()]
st = story()
vues = [vue(None, None, None, True),
        vue('01', 'Nettoyer', ["À l'eau tiède,", 'sans frotter.'], False),
        vue('02', 'Appliquer', ['Trois gouttes de sérum,', "du centre vers l'extérieur."], True),
        vue('03', 'Protéger', ['Une crème de jour,', 'puis une protection solaire.'], False)]

V = os.path.join(SITE, 'briefs', 'voara-visuels')
for i, p in enumerate(posts, 1):
    enregistrer(p, os.path.join(V, f'post-{i}.webp'), 86)
enregistrer(st, os.path.join(V, 'story.webp'), 86)
for i, v in enumerate(vues, 1):
    enregistrer(v, os.path.join(V, f'carrousel-{i}.webp'), 86)

planches = {'couverture': couverture(), 'planche-1': planche1(), 'planche-2': planche2(posts),
            'planche-3': planche3(st), 'planche-4': planche4(vues)}
P = os.path.join(SITE, 'portfolio', 'campagne-reseaux-sociaux-voara', 'img')
for nom, im in planches.items():
    enregistrer(im, os.path.join(V, 'planches-hd', nom + '.webp'), 84)
    enregistrer(im, os.path.join(P, nom + '.webp'), 86, (1024, 683))
