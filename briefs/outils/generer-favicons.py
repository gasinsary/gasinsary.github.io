# Icônes du site à partir d'un PNG carré (512 × 512 conseillé, fond transparent, symbole seul).
# Produit : favicon.ico (16, 32, 48) à la racine, assets/img/favicon.png (32), favicon-48/96/192.png,
# apple-touch-icon.png (180, fond blanc). Les balises sont dans _includes/head.html.
# Usage, depuis la racine du site : python briefs/outils/generer-favicons.py chemin/du/logo.png
import sys
from PIL import Image

src = Image.open(sys.argv[1]).convert('RGBA')
# Recadre sur le dessin puis remet au carré avec une petite marge
src = src.crop(src.getbbox())

def carre(taille, marge, fond=(0, 0, 0, 0)):
    c = Image.new('RGBA', (taille, taille), fond)
    k = taille * (1 - 2 * marge) / max(src.size)
    s = src.resize((max(1, round(src.width * k)), max(1, round(src.height * k))), Image.LANCZOS)
    c.alpha_composite(s, ((taille - s.width) // 2, (taille - s.height) // 2))
    return c

grand = carre(768, 0.04)
for t in (48, 96, 192):
    grand.resize((t, t), Image.LANCZOS).save(f'assets/img/favicon-{t}.png', optimize=True)
grand.resize((32, 32), Image.LANCZOS).save('assets/img/favicon.png', optimize=True)
carre(180, 0.12, (255, 255, 255, 255)).convert('RGB').save('assets/img/apple-touch-icon.png', optimize=True)
grand.save('favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
print('Icônes générées.')
