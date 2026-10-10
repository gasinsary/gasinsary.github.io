// Vignettes Behance (808 × 632) à partir des couvertures du site (3:2).
// L'image entière est gardée : on la réduit à 808 px de large et on complète en haut et en bas,
// en prolongeant les bords (fond uni) ou avec l'image floutée (« photo: true »).
// Lancer depuis la racine du site : node briefs/behance/vignettes.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const L = 808, H = 632;
const PROJETS = {
  'maison-vellane': ['site-vitrine-biscuiterie-maison-vellane'],
  'voolapp': ['application-web-gestion-commerciale-voolapp'],
  'voara': ['campagne-reseaux-sociaux-voara', { photo: true }],
  'bao-fizz': ['campagne-publicitaire-bao-fizz', { photo: true }],
};
(async () => {
  const sortie = path.join(__dirname, 'sortie');
  fs.mkdirSync(sortie, { recursive: true });
  for (const [nom, [projet, options = {}]] of Object.entries(PROJETS)) {
    const source = path.join('portfolio', projet, 'img', 'couverture.webp');
    const img = await sharp(source).resize({ width: L }).toBuffer({ resolveWithObject: true });
    const reste = H - img.info.height;
    const fichier = path.join(sortie, `vignette-${nom}.jpg`);
    if (options.photo) {
      const fond = await sharp(source).resize(L, H, { fit: 'cover' }).blur(30).modulate({ brightness: 0.85 }).toBuffer();
      await sharp(fond).composite([{ input: img.data, left: 0, top: Math.floor(reste / 2) }])
        .jpeg({ quality: 90, mozjpeg: true }).toFile(fichier);
    } else {
      await sharp(img.data).extend({ top: Math.floor(reste / 2), bottom: Math.ceil(reste / 2), extendWith: 'copy' })
        .jpeg({ quality: 90, mozjpeg: true }).toFile(fichier);
    }
  }
  console.log('ok');
})();
