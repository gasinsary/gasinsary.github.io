// Prépare les images du portfolio ComeUp (1260 × 708, 16:9) à partir des visuels du site.
// Les visuels du site sont en 3:2 : on les agrandit à 708 px de haut et on prolonge les bords.
// Un nom suivi de « * » est une photo dont les bords ne sont pas unis : le fond est alors
// l'image elle-même, agrandie et floutée.
// Lancer depuis la racine du site : node briefs/comeup-portfolio/preparer.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const P = 'portfolio';
const LOTS = {
  '1-maison-vellane': ['site-vitrine-biscuiterie-maison-vellane', ['couverture', 'accueil', 'mobile', 'biscuits', 'professionnels', 'identite']],
  '2-voolapp': ['application-web-gestion-commerciale-voolapp', ['couverture', 'tableau-de-bord', 'factures', 'caisse', 'stock', 'mobile']],
  '3-voara': ['campagne-reseaux-sociaux-voara', ['couverture*', 'planche-1', 'planche-2', 'planche-3', 'planche-4']],
  '4-bao-fizz': ['campagne-publicitaire-bao-fizz', ['couverture*', 'planche-1*', 'planche-2', 'planche-5', 'planche-6']],
};
const L = 1260, H = 708;

(async () => {
  const sortie = path.join(__dirname, 'sortie');
  for (const [lot, [projet, images]] of Object.entries(LOTS)) {
    const dossier = path.join(sortie, lot);
    fs.mkdirSync(dossier, { recursive: true });
    for (const [i, entree] of images.entries()) {
      const nom = entree.replace('*', '');
      const img = await sharp(path.join(P, projet, 'img', nom + '.webp')).resize({ height: H }).toBuffer({ resolveWithObject: true });
      const reste = L - img.info.width;
      const fichier = path.join(dossier, `${i + 1}-${nom}.jpg`);
      if (entree.endsWith('*')) {
        const fond = await sharp(img.data).resize(L, H, { fit: 'cover' }).blur(40).modulate({ brightness: 0.85 }).toBuffer();
        await sharp(fond).composite([{ input: img.data, left: Math.floor(reste / 2), top: 0 }])
          .jpeg({ quality: 88, mozjpeg: true }).toFile(fichier);
      } else {
        await sharp(img.data)
          .extend({ left: Math.floor(reste / 2), right: Math.ceil(reste / 2), extendWith: 'copy' })
          .jpeg({ quality: 88, mozjpeg: true }).toFile(fichier);
      }
    }
    console.log(lot, images.length);
  }

  // Lot 5 : les trois bannières d'exemple du service bannière, posées sur un fond crème.
  const B = path.join(__dirname, '..', 'comeup-banniere', 'sortie');
  const dossier = path.join(sortie, '5-bannieres');
  fs.mkdirSync(dossier, { recursive: true });
  const BANNIERES = ['banniere-youtube-baofizz', 'banniere-facebook-voara', 'banniere-linkedin-vellane'];
  for (const [i, nom] of BANNIERES.entries()) {
    const img = await sharp(path.join(B, nom + '.png')).resize({ width: 1100, height: 560, fit: 'inside' }).toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = img.info;
    const ombre = Buffer.from(`<svg width="${L}" height="${H}"><filter id="f"><feGaussianBlur stdDeviation="18"/></filter>
      <rect x="${(L - w) / 2}" y="${(H - h) / 2 + 14}" width="${w}" height="${h}" rx="6" fill="rgba(60,40,20,0.22)" filter="url(#f)"/></svg>`);
    await sharp({ create: { width: L, height: H, channels: 3, background: '#f3ede4' } })
      .composite([{ input: ombre, left: 0, top: 0 }, { input: img.data, left: Math.round((L - w) / 2), top: Math.round((H - h) / 2) }])
      .jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(dossier, `${i + 1}-${nom}.jpg`));
  }
  console.log('5-bannieres', BANNIERES.length);
})();
