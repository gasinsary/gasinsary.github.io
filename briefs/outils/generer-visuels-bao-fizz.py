# Génère les visuels de la campagne Bao Fizz et les planches de présentation.
# Usage : python generer-visuels-bao-fizz.py <dossier-polices> <dossier-du-site>
# Demande Pillow et les polices Archivo Black et Inter (variable),
# à télécharger depuis https://github.com/google/fonts (dossiers ofl/archivoblack et ofl/inter).
import math
import os
import random
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

FONTS, SITE = sys.argv[1], sys.argv[2]

JAUNE, CORAIL, VERT, NUIT, BLANC = (255, 198, 41), (255, 90, 78), (155, 214, 63), (20, 33, 61), (255, 255, 255)
JAUNE_CLAIR, CREME = (255, 214, 96), (255, 248, 231)
MANGUE = (255, 146, 43)

_cache = {}


def police(nom, taille):
    taille = max(4, int(round(taille)))
    cle = (nom, taille)
    if cle not in _cache:
        if nom == 'titre':
            f = ImageFont.truetype(os.path.join(FONTS, 'ArchivoBlack-Regular.ttf'), taille)
        else:
            f = ImageFont.truetype(os.path.join(FONTS, 'Inter[opsz,wght].ttf'), taille)
            f.set_variation_by_name({'gras': b'Bold', 'demi': b'SemiBold', 'normal': b'Regular'}[nom])
        _cache[cle] = f
    return _cache[cle]


class Toile:
    """Dessine en unités logiques ; l'image interne est suréchantillonnée (ss)."""

    def __init__(self, w, h, ss, fond):
        self.w, self.h, self.ss = w, h, ss
        self.im = Image.new('RGBA', (int(w * ss), int(h * ss)), fond + (255,))
        self.d = ImageDraw.Draw(self.im)

    def cercle(self, cx, cy, r, fill=None, outline=None, width=1):
        s = self.ss
        self.d.ellipse([(cx - r) * s, (cy - r) * s, (cx + r) * s, (cy + r) * s], fill=fill, outline=outline,
                       width=max(1, int(round(width * s))))

    def rect(self, x0, y0, x1, y1, fill=None, radius=0, outline=None, width=1):
        s = self.ss
        self.d.rounded_rectangle([x0 * s, y0 * s, x1 * s, y1 * s], radius=radius * s, fill=fill, outline=outline,
                                 width=max(1, int(round(width * s))))

    def largeur(self, texte, nom, taille):
        return police(nom, taille * self.ss).getlength(texte) / self.ss

    def texte(self, x, y, texte, nom, taille, fill, ancre='ls'):
        self.d.text((x * self.ss, y * self.ss), texte, font=police(nom, taille * self.ss), fill=fill, anchor=ancre)

    def poser(self, img, cx, cy):
        """Pose une image RGBA (déjà à l'échelle interne) centrée sur (cx, cy)."""
        x, y = int(cx * self.ss - img.size[0] / 2), int(cy * self.ss - img.size[1] / 2)
        calque = Image.new('RGBA', self.im.size, (0, 0, 0, 0))
        calque.paste(img, (x, y))
        self.im.alpha_composite(calque)
        self.d = ImageDraw.Draw(self.im)

    def ombre(self, cx, cy, rx, ry, alpha=70, flou=None):
        s = self.ss
        calque = Image.new('RGBA', self.im.size, (0, 0, 0, 0))
        ImageDraw.Draw(calque).ellipse([(cx - rx) * s, (cy - ry) * s, (cx + rx) * s, (cy + ry) * s], fill=NUIT + (alpha,))
        self.im.alpha_composite(calque.filter(ImageFilter.GaussianBlur((flou or ry) * s)))
        self.d = ImageDraw.Draw(self.im)

    def filet(self):
        """Filet de 1 px autour d'une bannière."""
        s = self.ss
        self.d.rectangle([0, 0, self.im.size[0] - 1, self.im.size[1] - 1], outline=NUIT, width=max(1, int(s)))

    def maitre(self):
        return self.im

    def sortie(self):
        return self.im.resize((self.w, self.h), Image.LANCZOS)


def degrade_h(w, h, arrets):
    im = Image.new('RGBA', (w, 1))
    px = im.load()
    for x in range(w):
        t = x / max(1, w - 1)
        for (p0, c0), (p1, c1) in zip(arrets, arrets[1:]):
            if p0 <= t <= p1:
                k = (t - p0) / (p1 - p0) if p1 > p0 else 0
                px[x, 0] = tuple(round(c0[i] + (c1[i] - c0[i]) * k) for i in range(4))
                break
    return im.resize((w, h))


def tranche(rayon, couleur=VERT):
    """Tranche d'agrume vue de face (RGBA), rayon en pixels."""
    k = 3
    r = rayon * k
    im = Image.new('RGBA', (2 * r + 2, 2 * r + 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    c = r + 1
    fonce = tuple(int(v * 0.72) for v in couleur)
    pale = (244, 250, 214)
    d.ellipse([c - r, c - r, c + r, c + r], fill=fonce)
    d.ellipse([c - r * 0.90, c - r * 0.90, c + r * 0.90, c + r * 0.90], fill=pale)
    n, ecart = 8, 7
    for i in range(n):
        a0 = 360 / n * i + ecart / 2
        d.pieslice([c - r * 0.80, c - r * 0.80, c + r * 0.80, c + r * 0.80], a0, a0 + 360 / n - ecart, fill=couleur)
    d.ellipse([c - r * 0.13, c - r * 0.13, c + r * 0.13, c + r * 0.13], fill=pale)
    return im.resize((2 * rayon + 1, 2 * rayon + 1), Image.LANCZOS)


def canette(hauteur, couleur=VERT, parfum='CITRON VERT', angle=0):
    """Canette 33 cl (RGBA) de la hauteur demandée, en pixels."""
    k = 2
    H = int(hauteur * k)
    W = int(H / 1.95)
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    haut, bas = int(H * 0.07), int(H * 0.04)
    # corps blanc
    corps = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    dc = ImageDraw.Draw(corps)
    dc.rounded_rectangle([0, haut, W - 1, H - 1], radius=int(W * 0.10), fill=BLANC + (255,))
    dc.rectangle([0, haut, W - 1, haut + int(W * 0.12)], fill=BLANC + (255,))
    # motif de l'étiquette
    cx = W / 2
    r = W * 0.40
    cy = haut + (H - haut) * 0.40
    dc.ellipse([cx - r, cy - r, cx + r, cy + r], fill=couleur + (255,))
    t = W * 0.30
    dc.text((cx, cy - t * 0.42), 'BAO', font=police('titre', t), fill=NUIT, anchor='mm')
    dc.text((cx, cy + t * 0.48), 'FIZZ', font=police('titre', t), fill=NUIT, anchor='mm')
    dc.text((cx, cy + r + W * 0.13), parfum, font=police('gras', W * 0.085), fill=NUIT, anchor='mm')
    dc.text((cx, cy + r + W * 0.25), 'Pétillant au baobab', font=police('demi', W * 0.062), fill=NUIT, anchor='mm')
    tr = tranche(int(W * 0.17), couleur)
    corps.alpha_composite(tr, (int(cx - tr.size[0] / 2), int(H - bas - W * 0.36 - tr.size[1] / 2 + W * 0.10)))
    dc = ImageDraw.Draw(corps)
    dc.text((cx, H - bas - W * 0.07), '33 cl', font=police('demi', W * 0.055), fill=NUIT, anchor='mm')
    # bande de couleur en bas
    bande = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(bande).rectangle([0, H - bas, W, H], fill=couleur + (255,))
    masque = Image.new('L', (W, H), 0)
    ImageDraw.Draw(masque).rounded_rectangle([0, haut, W - 1, H - 1], radius=int(W * 0.10), fill=255)
    ImageDraw.Draw(masque).rectangle([0, haut, W - 1, haut + int(W * 0.12)], fill=255)
    corps = Image.composite(Image.alpha_composite(corps, bande), Image.new('RGBA', (W, H), (0, 0, 0, 0)), masque)
    im.alpha_composite(corps)
    # haut métallique : épaule et couvercle
    d = ImageDraw.Draw(im)
    epaule = degrade_h(W, haut, [(0, (150, 156, 165, 255)), (0.3, (238, 240, 244, 255)), (0.6, (196, 200, 208, 255)), (1, (132, 138, 148, 255))])
    m = Image.new('L', (W, haut), 0)
    ImageDraw.Draw(m).polygon([(W * 0.12, haut * 0.30), (W * 0.88, haut * 0.30), (W - 1, haut), (0, haut)], fill=255)
    im.paste(epaule, (0, 0), m)
    d.ellipse([W * 0.12, 0, W * 0.88, haut * 0.60], fill=(222, 225, 231, 255), outline=(150, 156, 165, 255), width=max(1, k))
    d.rectangle([0, haut - k, W, haut], fill=(160, 166, 176, 255))
    # volume : ombres sur les bords, reflet à gauche
    volume = degrade_h(W, H, [(0, (20, 33, 61, 110)), (0.14, (20, 33, 61, 0)), (0.22, (255, 255, 255, 70)), (0.30, (255, 255, 255, 0)),
                              (0.72, (20, 33, 61, 0)), (1, (20, 33, 61, 130))])
    masque_total = im.split()[3]
    volume.putalpha(ImageChops.multiply(volume.split()[3], masque_total))
    im.alpha_composite(volume)
    im = im.resize((W // k, H // k), Image.LANCZOS)
    if angle:
        im = im.rotate(angle, resample=Image.BICUBIC, expand=True)
    return im


def bulles(t, graine, n, zone, rmin, rmax):
    rnd = random.Random(graine)
    x0, y0, x1, y1 = zone
    for _ in range(n):
        r = rnd.uniform(rmin, rmax)
        t.cercle(rnd.uniform(x0, x1), rnd.uniform(y0, y1), r, outline=BLANC + (230,), width=max(0.6, r * 0.16))


def logo(t, x, y, taille, ancre='ls'):
    """Mot-symbole BAO FIZZ : BAO en bleu nuit, FIZZ en corail."""
    wb, esp = t.largeur('BAO', 'titre', taille), taille * 0.22
    wf = t.largeur('FIZZ', 'titre', taille)
    if ancre == 'ms':
        x -= (wb + esp + wf) / 2
    t.texte(x, y, 'BAO', 'titre', taille, NUIT)
    t.texte(x + wb + esp, y, 'FIZZ', 'titre', taille, CORAIL)
    return wb + esp + wf


def bouton(t, x, y, w, h, taille, centre=False):
    if centre:
        x -= w / 2
    t.rect(x, y, x + w, y + h, fill=NUIT, radius=h / 2)
    t.texte(x + w / 2, y + h / 2, "J'en profite", 'gras', taille, BLANC, 'mm')


# ------------------------------------------------------------------ visuels
def visuel_paysage(w, h, ss):
    """Visuel principal (16:9), en-tête de newsletter (2:1) et couverture (3:2)."""
    t = Toile(w, h, ss, JAUNE)
    x = h * 0.11
    etroit = w / h < 1.6
    if etroit:
        lignes, taille, bases = ["L'été", 'a du', 'peps.'], h * 0.16, [0.31, 0.46, 0.61]
        y_offre, y_bouton = 0.765, 0.815
    else:
        lignes, taille, bases = ["L'été", 'a du peps.'], h * 0.15, [0.40, 0.555]
        y_offre, y_bouton = 0.705, 0.775
    bloc = max(t.largeur(l, 'titre', taille) for l in lignes)
    cx = max(x + bloc + h * 0.53, w - h * 0.50)
    cy = h * 0.52
    t.cercle(cx, cy, h * 0.60, fill=JAUNE_CLAIR)
    t.cercle(cx, cy, h * 0.43, fill=CORAIL)
    bulles(t, 7, 16, (cx - h * 0.50, h * 0.06, w - h * 0.02, h * 0.94), h * 0.008, h * 0.028)
    t.ombre(cx + h * 0.02, cy + h * 0.40, h * 0.34, h * 0.03, 80)
    t.poser(canette(h * 0.60 * ss, MANGUE, 'MANGUE', 20), cx - h * 0.25, cy + h * 0.08)
    t.poser(canette(h * 0.60 * ss, CORAIL, 'HIBISCUS', -17), cx + h * 0.27, cy + h * 0.07)
    t.poser(canette(h * 0.80 * ss, VERT, 'CITRON VERT', 5), cx, cy)
    t.poser(tranche(int(h * 0.075 * ss)).rotate(20, resample=Image.BICUBIC), cx - h * 0.36, h * 0.13)
    t.poser(tranche(int(h * 0.055 * ss)).rotate(-15, resample=Image.BICUBIC), cx + h * 0.40, h * 0.86)
    logo(t, x, h * 0.16, h * 0.062)
    for ligne, base in zip(lignes, bases):
        t.texte(x, h * base, ligne, 'titre', taille, NUIT)
    wp = t.largeur('-20 %', 'titre', h * 0.095)
    t.texte(x, h * y_offre, '-20 %', 'titre', h * 0.095, CORAIL)
    t.texte(x + wp + h * 0.03, h * (y_offre - 0.040), 'sur le pack', 'gras', h * 0.038, NUIT)
    t.texte(x + wp + h * 0.03, h * y_offre, 'découverte', 'gras', h * 0.038, NUIT)
    bouton(t, x, h * y_bouton, h * 0.36, h * 0.095, h * 0.040)
    return t


def pave(ss):  # 300 x 250
    t = Toile(300, 250, ss, JAUNE)
    t.cercle(246, 136, 112, fill=JAUNE_CLAIR)
    t.cercle(246, 136, 82, fill=CORAIL)
    bulles(t, 3, 7, (150, 8, 296, 244), 2, 6)
    t.ombre(248, 226, 56, 6, 80)
    t.poser(canette(186 * ss, VERT, 'CITRON VERT', 6), 248, 134)
    logo(t, 16, 30, 15)
    t.texte(16, 76, "L'été", 'titre', 28, NUIT)
    t.texte(16, 106, 'a du peps.', 'titre', 28, NUIT)
    t.texte(16, 150, '-20 %', 'titre', 25, CORAIL)
    t.texte(16, 170, 'sur le pack découverte', 'gras', 10.5, NUIT)
    bouton(t, 16, 196, 112, 34, 12.5)
    t.filet()
    return t


def banniere(ss):  # 728 x 90
    t = Toile(728, 90, ss, JAUNE)
    t.cercle(520, 45, 74, fill=JAUNE_CLAIR)
    t.cercle(520, 45, 54, fill=CORAIL)
    bulles(t, 5, 6, (440, 6, 596, 84), 2, 5)
    t.poser(canette(150 * ss, VERT, 'CITRON VERT', -62), 520, 45)
    logo(t, 18, 54, 21)
    t.d.rectangle([150 * ss, 20 * ss, 151 * ss, 70 * ss], fill=NUIT)
    t.texte(170, 44, "L'été a du peps.", 'titre', 29, NUIT)
    wp = t.largeur('-20 % ', 'gras', 14)
    t.texte(170, 68, '-20 %', 'gras', 14, CORAIL)
    t.texte(170 + wp, 68, 'sur le pack découverte', 'gras', 14, NUIT)
    bouton(t, 602, 27, 110, 36, 13)
    t.filet()
    return t


def skyscraper(ss):  # 160 x 600
    t = Toile(160, 600, ss, JAUNE)
    t.cercle(80, 320, 128, fill=JAUNE_CLAIR)
    t.cercle(80, 320, 92, fill=CORAIL)
    bulles(t, 11, 9, (6, 190, 154, 450), 2, 6)
    t.ombre(82, 444, 44, 6, 80)
    t.poser(canette(240 * ss, VERT, 'CITRON VERT', 5), 80, 322)
    logo(t, 80, 40, 16, 'ms')
    for i, mot in enumerate(["L'été", 'a du', 'peps.']):
        t.texte(80, 96 + i * 40, mot, 'titre', 37, NUIT, 'ms')
    t.texte(80, 506, '-20 %', 'titre', 33, CORAIL, 'ms')
    t.texte(80, 524, 'sur le pack', 'gras', 11, NUIT, 'ms')
    t.texte(80, 538, 'découverte', 'gras', 11, NUIT, 'ms')
    bouton(t, 80, 552, 128, 34, 12.5, centre=True)
    t.filet()
    return t


def demi_page(ss):  # 300 x 600
    t = Toile(300, 600, ss, JAUNE)
    t.cercle(150, 310, 186, fill=JAUNE_CLAIR)
    t.cercle(150, 310, 132, fill=CORAIL)
    bulles(t, 13, 12, (10, 170, 290, 470), 2.5, 8)
    t.ombre(153, 456, 80, 9, 80)
    t.poser(canette(250 * ss, MANGUE, 'MANGUE', 22), 86, 326)
    t.poser(canette(250 * ss, CORAIL, 'HIBISCUS', -19), 216, 324)
    t.poser(canette(300 * ss, VERT, 'CITRON VERT', 4), 150, 308)
    logo(t, 150, 46, 22, 'ms')
    t.texte(150, 104, "L'été a du", 'titre', 43, NUIT, 'ms')
    t.texte(150, 150, 'peps.', 'titre', 43, NUIT, 'ms')
    t.texte(150, 518, '-20 %', 'titre', 38, CORAIL, 'ms')
    t.texte(150, 538, 'sur le pack découverte', 'gras', 13, NUIT, 'ms')
    bouton(t, 150, 550, 178, 38, 14, centre=True)
    t.filet()
    return t


# ------------------------------------------------------------------ planches
def planche_base(fond=CREME):
    return Image.new('RGBA', (2048, 1366), fond + (255,))


def ecrire(im, x, y, texte, nom, taille, fill, ancre='ls'):
    ImageDraw.Draw(im).text((x, y), texte, font=police(nom, taille), fill=fill, anchor=ancre)


def avec_ombre(planche, visuel, x, y, flou=26, alpha=60):
    w, h = visuel.size
    ombre = Image.new('RGBA', planche.size, (0, 0, 0, 0))
    ImageDraw.Draw(ombre).rectangle([x + 6, y + 18, x + w - 6, y + h + 18], fill=NUIT + (alpha,))
    planche.alpha_composite(ombre.filter(ImageFilter.GaussianBlur(flou)))
    planche.alpha_composite(visuel.convert('RGBA'), (x, y))


def mise_a_taille(t, w):
    m = t.maitre()
    return m.resize((w, round(m.size[1] * w / m.size[0])), Image.LANCZOS)


def planche1(kv):
    im = planche_base()
    ecrire(im, 1024, 150, 'VISUEL PRINCIPAL', 'gras', 28, NUIT, 'ms')
    v = mise_a_taille(kv, 1720)
    avec_ombre(im, v, (2048 - 1720) // 2, 220)
    ecrire(im, 1024, 1270, '1920 × 1080 px', 'demi', 28, NUIT, 'ms')
    return im


def planche2(pv, bn, sk, dp):
    im = planche_base()
    ecrire(im, 1024, 110, 'QUATRE BANNIÈRES, UNE MÊME CAMPAGNE', 'gras', 28, NUIT, 'ms')
    e = 1.5
    b = mise_a_taille(bn, int(728 * e))
    avec_ombre(im, b, (2048 - b.size[0]) // 2, 170)
    y = 380
    s, d, p = mise_a_taille(sk, int(160 * e)), mise_a_taille(dp, int(300 * e)), mise_a_taille(pv, int(300 * e))
    x0 = (2048 - (s.size[0] + d.size[0] + p.size[0] + 2 * 110)) // 2
    avec_ombre(im, s, x0, y)
    avec_ombre(im, d, x0 + s.size[0] + 110, y)
    xp = x0 + s.size[0] + d.size[0] + 220
    avec_ombre(im, p, xp, y)
    lignes = [('Bannière', '728 × 90 px'), ('Skyscraper', '160 × 600 px'), ('Demi-page', '300 × 600 px'), ('Pavé', '300 × 250 px')]
    yy = y + p.size[1] + 110
    for nom, taille in lignes:
        ecrire(im, xp, yy, nom, 'gras', 30, NUIT)
        ecrire(im, xp + p.size[0], yy, taille, 'normal', 30, NUIT, 'rs')
        ImageDraw.Draw(im).rectangle([xp, yy + 22, xp + p.size[0], yy + 23], fill=(225, 214, 190))
        yy += 76
    return im


def barres(d, x, y, w, n, h=16, esp=18, couleur=(226, 229, 235), dernier=0.6):
    for i in range(n):
        d.rounded_rectangle([x, y, x + (w * dernier if i == n - 1 else w), y + h], radius=h / 2, fill=couleur)
        y += h + esp
    return y


def planche3(bn, pv):
    im = planche_base(NUIT)
    ecrire(im, 1024, 110, 'LES BANNIÈRES EN SITUATION', 'gras', 28, BLANC, 'ms')
    x0, y0, x1, y1 = 224, 170, 1824, 1290
    k = 3
    fen = Image.new('RGBA', ((x1 - x0) * k, (y1 - y0) * k), (0, 0, 0, 0))
    ImageDraw.Draw(fen).rounded_rectangle([0, 0, fen.size[0] - 1, fen.size[1] - 1], radius=26 * k, fill=BLANC + (255,))
    im.alpha_composite(fen.resize((x1 - x0, y1 - y0), Image.LANCZOS), (x0, y0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([x0, y0, x1, y0 + 70], radius=26, fill=(238, 240, 244))
    d.rectangle([x0, y0 + 40, x1, y0 + 70], fill=(238, 240, 244))
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        d.ellipse([x0 + 28 + i * 34, y0 + 24, x0 + 50 + i * 34, y0 + 46], fill=c)
    d.rounded_rectangle([x0 + 170, y0 + 16, x1 - 170, y0 + 54], radius=19, fill=BLANC)
    ecrire(im, x0 + 196, y0 + 42, 'www.magazine-exemple.fr', 'normal', 20, (120, 126, 138))
    # bannière en haut de page
    b = mise_a_taille(bn, 1165)
    im.alpha_composite(b, ((2048 - b.size[0]) // 2, y0 + 104))
    d = ImageDraw.Draw(im)
    # contenu factice : article à gauche, pavé à droite
    ax, ay = x0 + 90, y0 + 104 + b.size[1] + 70
    d.rounded_rectangle([ax, ay, ax + 620, ay + 34], radius=17, fill=(196, 201, 212))
    d.rounded_rectangle([ax, ay + 56, ax + 430, ay + 90], radius=17, fill=(196, 201, 212))
    d.rounded_rectangle([ax, ay + 140, ax + 880, ay + 430], radius=14, fill=(232, 235, 240))
    barres(d, ax, ay + 480, 880, 7)
    p = mise_a_taille(pv, 450)
    px = x1 - 90 - p.size[0]
    im.alpha_composite(p, (px, ay))
    d = ImageDraw.Draw(im)
    barres(d, px, ay + p.size[1] + 50, p.size[0], 6)
    return im


def planche4(nl):
    im = planche_base(NUIT)
    ecrire(im, 1024, 110, "L'EN-TÊTE DE NEWSLETTER EN SITUATION", 'gras', 28, BLANC, 'ms')
    x0, y0, x1, y1 = 224, 170, 1824, 1290
    k = 3
    fen = Image.new('RGBA', ((x1 - x0) * k, (y1 - y0) * k), (0, 0, 0, 0))
    ImageDraw.Draw(fen).rounded_rectangle([0, 0, fen.size[0] - 1, fen.size[1] - 1], radius=26 * k, fill=(244, 245, 248, 255))
    im.alpha_composite(fen.resize((x1 - x0, y1 - y0), Image.LANCZOS), (x0, y0))
    d = ImageDraw.Draw(im)
    # colonne de gauche : liste de messages
    d.rounded_rectangle([x0, y0, x0 + 400, y1], radius=26, fill=(232, 235, 241))
    d.rectangle([x0 + 370, y0, x0 + 400, y1], fill=(232, 235, 241))
    y = y0 + 50
    for i in range(7):
        actif = i == 1
        if actif:
            d.rounded_rectangle([x0 + 22, y - 18, x0 + 378, y + 92], radius=14, fill=BLANC)
        d.ellipse([x0 + 44, y, x0 + 92, y + 48], fill=CORAIL if actif else (198, 203, 214))
        if actif:
            ecrire(im, x0 + 112, y + 20, 'Bao Fizz', 'gras', 22, NUIT)
            ecrire(im, x0 + 112, y + 52, "L'été a du peps", 'normal', 19, (90, 98, 115))
            d = ImageDraw.Draw(im)
        else:
            d.rounded_rectangle([x0 + 112, y + 4, x0 + 290, y + 20], radius=8, fill=(198, 203, 214))
            d.rounded_rectangle([x0 + 112, y + 32, x0 + 350, y + 46], radius=7, fill=(214, 218, 226))
        y += 140
    # message ouvert
    mx = x0 + 400 + 70
    largeur = x1 - 70 - mx
    ecrire(im, mx, y0 + 84, "L'été a du peps : -20 % sur le pack découverte", 'gras', 32, NUIT)
    ecrire(im, mx, y0 + 126, 'Bao Fizz  ·  bonjour@baofizz.exemple', 'normal', 21, (110, 118, 134))
    carte_w = 960
    cx0 = mx + (largeur - carte_w) // 2
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([cx0, y0 + 170, cx0 + carte_w, y1 - 40], radius=16, fill=BLANC)
    v = mise_a_taille(nl, carte_w)
    masque = Image.new('L', v.size, 0)
    ImageDraw.Draw(masque).rounded_rectangle([0, 0, v.size[0] - 1, v.size[1] + 40], radius=16, fill=255)
    im.paste(v, (cx0, y0 + 170), masque)
    d = ImageDraw.Draw(im)
    yy = y0 + 170 + v.size[1] + 50
    d.rounded_rectangle([cx0 + 60, yy, cx0 + 520, yy + 26], radius=13, fill=(196, 201, 212))
    yy = barres(d, cx0 + 60, yy + 60, carte_w - 120, 4)
    return im


# ------------------------------------------------------------------ export
def grain(im, sigma=2.0):
    bruit = Image.effect_noise(im.size, sigma).convert('RGB')
    return ImageChops.add(im.convert('RGB'), bruit, 1, -128)


def enregistrer(im, chemin, qualite=90, taille=None, avec_grain=False):
    os.makedirs(os.path.dirname(chemin), exist_ok=True)
    out = grain(im) if avec_grain else im.convert('RGB')
    if taille:
        out = out.resize(taille, Image.LANCZOS)
    if chemin.endswith('.png'):
        out.save(chemin, 'PNG', optimize=True)
    else:
        out.save(chemin, 'WEBP', quality=qualite, method=6)
    print(f"{os.path.getsize(chemin) // 1024:>4} Ko  {out.size}  {os.path.relpath(chemin, SITE)}")


kv = visuel_paysage(1920, 1080, 2)
nl = visuel_paysage(1200, 600, 3)
pv, bn, sk, dp = pave(6), banniere(6), skyscraper(6), demi_page(6)

V = os.path.join(SITE, 'briefs', 'bao-fizz-visuels')
enregistrer(kv.sortie(), os.path.join(V, 'visuel-principal-1920x1080.webp'), 90)
enregistrer(nl.sortie(), os.path.join(V, 'newsletter-1200x600.webp'), 90)
for nom, t in [('pave-300x250', pv), ('banniere-728x90', bn), ('skyscraper-160x600', sk), ('demi-page-300x600', dp)]:
    enregistrer(t.sortie(), os.path.join(V, nom + '.png'))
    enregistrer(t.maitre().resize((t.w * 2, t.h * 2), Image.LANCZOS), os.path.join(V, nom + '@2x.webp'), 92)

planches = {
    'couverture': visuel_paysage(2048, 1366, 2).sortie(),
    'planche-1': planche1(kv),
    'planche-2': planche2(pv, bn, sk, dp),
    'planche-3': planche3(bn, pv),
    'planche-4': planche4(nl),
}
P = os.path.join(SITE, 'portfolio', 'campagne-publicitaire-bao-fizz', 'img')
for nom, im in planches.items():
    enregistrer(im, os.path.join(V, 'planches-hd', nom + '.webp'), 88)
    enregistrer(im, os.path.join(P, nom + '.webp'), 86, (1024, 683))
