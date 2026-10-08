// Met en scène les captures d'écran de Voolapp pour le portfolio : fenêtre d'ordinateur, téléphone, feuille imprimée.
// Usage : node composer-ecrans-voolapp.js <dossier-des-captures> <dossier-de-sortie>
// Demande le module « sharp ». Captures attendues : voir la liste SCENES en bas du fichier.
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const SOURCE = path.resolve(process.argv[2]);
const SORTIE = path.resolve(process.argv[3]);
const W = 1024, H = 683;

// Couleurs : fond du site et orange de Voolapp
const FOND = '#f4f3f0', TACHE_ORANGE = '#fbe3c6', TACHE_GRISE = '#e3e8ee', ORANGE = '#f28c1b', NUIT = '#1f2430';

// Le fond est dessiné avec une marge M tout autour : les ombres peuvent dépasser, puis on recadre.
const M = 120;
function fond() {
  return sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W + 2 * M}" height="${H + 2 * M}">
    <rect width="${W + 2 * M}" height="${H + 2 * M}" fill="${FOND}"/>
    <circle cx="${150 + M}" cy="${80 + M}" r="230" fill="${TACHE_ORANGE}"/>
    <circle cx="${900 + M}" cy="${640 + M}" r="260" fill="${TACHE_GRISE}"/>
  </svg>`)).png();
}

// Ombre douce sous un rectangle
async function ombre(w, h, rx, flou = 22, opacite = 0.28) {
  const marge = flou * 3;
  return sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w + marge * 2}" height="${h + marge * 2}">
    <rect x="${marge}" y="${marge + 10}" width="${w}" height="${h}" rx="${rx}" fill="${NUIT}" fill-opacity="${opacite}"/>
  </svg>`)).blur(flou).png().toBuffer().then(b => ({ buffer: b, marge }));
}

// Arrondit les coins d'une image
async function arrondir(buffer, w, h, rx) {
  const masque = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${rx}" fill="#fff"/></svg>`);
  return sharp(buffer).composite([{ input: masque, blend: 'dest-in' }]).png().toBuffer();
}

// Fenêtre d'ordinateur : barre de titre à trois points, capture en dessous
async function fenetre(fichier, largeur) {
  const BARRE = 34, RX = 12;
  const capture = await sharp(path.join(SOURCE, fichier)).resize({ width: largeur }).png().toBuffer();
  const { height } = await sharp(capture).metadata();
  const h = height + BARRE;
  const barre = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${largeur}" height="${h}">
    <rect width="${largeur}" height="${h}" fill="#e9e9ec"/>
    <circle cx="20" cy="17" r="6" fill="#ff5f57"/><circle cx="40" cy="17" r="6" fill="#febc2e"/><circle cx="60" cy="17" r="6" fill="#28c840"/>
    <rect x="${largeur / 2 - 120}" y="9" width="240" height="16" rx="8" fill="#ffffff"/>
  </svg>`);
  const brut = await sharp(barre).composite([{ input: capture, top: BARRE, left: 0 }]).png().toBuffer();
  return { buffer: await arrondir(brut, largeur, h, RX), w: largeur, h, rx: RX };
}

// Téléphone : contour sombre, écran arrondi, capture mobile recadrée (sans la barre du navigateur)
async function telephone(fichier, largeurEcran, cadrages) {
  const BORD = 12, RX = 38;
  // Les zones recadrées sont empilées : on retire la barre du navigateur et une carte coupée par le défilement
  const parties = [];
  let hauteurTotale = 0;
  for (const c of cadrages) {
    parties.push({ input: await sharp(path.join(SOURCE, fichier)).extract(c).png().toBuffer(), top: hauteurTotale, left: 0 });
    hauteurTotale += c.height;
  }
  const largeurSource = cadrages[0].width;
  const assemblage = await sharp({ create: { width: largeurSource, height: hauteurTotale, channels: 4, background: '#f6f6f8' } }).composite(parties).png().toBuffer();
  const ecran = await sharp(assemblage).resize({ width: largeurEcran }).png().toBuffer();
  const { height } = await sharp(ecran).metadata();
  const w = largeurEcran + BORD * 2, h = height + BORD * 2;
  const corps = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${RX}" fill="#1c1c1e"/></svg>`);
  const ecranArrondi = await arrondir(ecran, largeurEcran, height, RX - BORD);
  const buffer = await sharp(corps).composite([{ input: ecranArrondi, top: BORD, left: BORD }]).png().toBuffer();
  return { buffer, w, h, rx: RX };
}

// Pose un élément (fenêtre, téléphone, feuille) avec son ombre sur une liste de calques
async function poser(calques, element, left, top) {
  const o = await ombre(element.w, element.h, element.rx);
  calques.push({ input: o.buffer, left: left - o.marge, top: top - o.marge });
  calques.push({ input: element.buffer, left, top });
}

async function enregistrer(calques, nom, jpgAussi = false) {
  const decales = calques.map(c => ({ ...c, left: c.left + M, top: c.top + M }));
  const image = await fond().composite(decales).png().toBuffer().then(b => sharp(b).extract({ left: M, top: M, width: W, height: H }).png().toBuffer());
  await sharp(image).webp({ quality: 84 }).toFile(path.join(SORTIE, nom + '.webp'));
  if (jpgAussi) await sharp(image).jpeg({ quality: 86 }).toFile(path.join(SORTIE, nom + '.jpg'));
  console.log(nom, Math.round(fs.statSync(path.join(SORTIE, nom + '.webp')).size / 1024) + ' Ko');
}

// La capture mobile : l'en-tête de l'application, puis les cartes à partir de la première entière
const CADRAGE_MOBILE = [{ left: 0, top: 172, width: 738, height: 100 }, { left: 0, top: 458, width: 738, height: 1042 }];

async function sceneFenetre(fichier, nom) {
  const f = await fenetre(fichier, 900);
  const calques = [];
  await poser(calques, f, (W - f.w) / 2, Math.round((H - f.h) / 2));
  await enregistrer(calques, nom);
}

async function sceneCouverture() {
  const f = await fenetre('tableau-de-bord.png', 800);
  const t = await telephone('mobile.jpg', 236, CADRAGE_MOBILE);
  const calques = [];
  await poser(calques, f, 40, 48);
  await poser(calques, t, W - t.w - 44, H - t.h - 30);
  await enregistrer(calques, 'couverture', true);
}

async function sceneMobile() {
  const t = await telephone('mobile.jpg', 322, CADRAGE_MOBILE);
  const calques = [];
  await poser(calques, t, Math.round((W - t.w) / 2), Math.round((H - t.h) / 2));
  await enregistrer(calques, 'mobile');
}

// La facture imprimée : la page extraite de l'aperçu PDF, posée comme une feuille, avec une seconde feuille derrière
async function sceneFacture() {
  const page = await sharp(path.join(SOURCE, 'facture-pdf.png')).extract({ left: 594, top: 72, width: 728, height: 740 }).resize({ height: 620 }).png().toBuffer();
  const { width } = await sharp(page).metadata();
  const feuille = { buffer: await arrondir(page, width, 620, 6), w: width, h: 620, rx: 6 };
  const derriere = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width + 60}" height="${660}">
    <g transform="rotate(-5 ${width / 2 + 30} 330)"><rect x="30" y="20" width="${width}" height="620" rx="6" fill="#ffffff"/></g>
  </svg>`);
  const calques = [];
  const oD = await ombre(width, 620, 6, 18, 0.18);
  calques.push({ input: oD.buffer, left: Math.round((W - width) / 2) - oD.marge - 24, top: 32 - oD.marge + 8 });
  calques.push({ input: derriere, left: Math.round((W - width) / 2) - 30 - 24, top: 12 });
  await poser(calques, feuille, Math.round((W - width) / 2) + 20, 32);
  await enregistrer(calques, 'facture-pdf');
}

const SCENES = [
  ['tableau-de-bord.png', 'tableau-de-bord'],
  ['factures.png', 'factures'],
  ['facture.png', 'facture'],
  ['recouvrement.png', 'recouvrement'],
  ['caisse.png', 'caisse'],
  ['stock.png', 'stock'],
  ['produits.png', 'produits'],
  ['commande.png', 'commande'],
  ['clients.png', 'clients'],
];

(async () => {
  fs.mkdirSync(SORTIE, { recursive: true });
  await sceneCouverture();
  for (const [fichier, nom] of SCENES) await sceneFenetre(fichier, nom);
  await sceneFacture();
  await sceneMobile();
})().catch(e => { console.error(e); process.exit(1); });
