// Codeur n'accepte qu'une image par réalisation : une planche 1260 × 708 par projet,
// une grande vue à gauche et deux petites à droite, sur fond crème.
// Lancer depuis la racine du site : node briefs/codeur/planches.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const L = 1260, H = 708, FOND = '#f3ede4';
const PROJETS = {
  'maison-vellane': ['site-vitrine-biscuiterie-maison-vellane', 'couverture', 'identite', 'biscuits'],
  'voolapp': ['application-web-gestion-commerciale-voolapp', 'couverture', 'factures', 'mobile'],
  'voara': ['campagne-reseaux-sociaux-voara', 'couverture', 'planche-1', 'planche-2'],
  'bao-fizz': ['campagne-publicitaire-bao-fizz', 'couverture', 'planche-5', 'planche-2'],
};

// Image arrondie, avec son ombre
async function bloc(fichier, largeur, hauteur) {
  const masque = Buffer.from(`<svg width="${largeur}" height="${hauteur}"><rect width="${largeur}" height="${hauteur}" rx="14" fill="#fff"/></svg>`);
  return sharp(fichier).resize(largeur, hauteur, { fit: 'cover' })
    .composite([{ input: masque, blend: 'dest-in' }]).png().toBuffer();
}
function ombre(x, y, l, h) {
  return { input: Buffer.from(`<svg width="${L}" height="${H}"><filter id="f"><feGaussianBlur stdDeviation="12"/></filter>
    <rect x="${x}" y="${y + 8}" width="${l}" height="${h}" rx="14" fill="rgba(60,40,20,0.20)" filter="url(#f)"/></svg>`), left: 0, top: 0 };
}

(async () => {
  const sortie = path.join(__dirname, 'sortie');
  fs.mkdirSync(sortie, { recursive: true });
  for (const [nom, [projet, grande, petite1, petite2]] of Object.entries(PROJETS)) {
    const img = n => path.join('portfolio', projet, 'img', n + '.webp');
    // Grande vue 828 × 552 à gauche, deux vues 384 × 256 à droite
    const G = { x: 24, y: 78, l: 828, h: 552 };
    const P1 = { x: 876, y: 78, l: 360, h: 256 };
    const P2 = { x: 876, y: 374, l: 360, h: 256 };
    const calques = [];
    for (const [b, n] of [[G, grande], [P1, petite1], [P2, petite2]]) {
      calques.push(ombre(b.x, b.y, b.l, b.h));
      calques.push({ input: await bloc(img(n), b.l, b.h), left: b.x, top: b.y });
    }
    await sharp({ create: { width: L, height: H, channels: 3, background: FOND } })
      .composite(calques).jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(sortie, `codeur-${nom}.jpg`));
  }
  console.log('ok');
})();
