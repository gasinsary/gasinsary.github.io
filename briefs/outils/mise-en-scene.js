// Fonctions de mise en scène des captures d'écran pour le portfolio : fenêtre d'ordinateur, téléphone, fond.
// Module partagé : voir composer-ecrans-vellane.js pour un exemple d'utilisation. Demande le module « sharp ».
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const W = 1024, H = 683;
const M = 120; // marge autour du fond : les ombres peuvent dépasser, puis on recadre

function creer({ fond, tache1, tache2, ombre = '#1f2430' }) {
  function fondImage() {
    return sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W + 2 * M}" height="${H + 2 * M}">
      <rect width="${W + 2 * M}" height="${H + 2 * M}" fill="${fond}"/>
      <circle cx="${150 + M}" cy="${80 + M}" r="230" fill="${tache1}"/>
      <circle cx="${900 + M}" cy="${640 + M}" r="260" fill="${tache2}"/>
    </svg>`)).png();
  }

  async function ombrePortee(w, h, rx, flou = 22, opacite = 0.28) {
    const marge = flou * 3;
    const buffer = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w + marge * 2}" height="${h + marge * 2}">
      <rect x="${marge}" y="${marge + 10}" width="${w}" height="${h}" rx="${rx}" fill="${ombre}" fill-opacity="${opacite}"/>
    </svg>`)).blur(flou).png().toBuffer();
    return { buffer, marge };
  }

  async function arrondir(buffer, w, h, rx) {
    const masque = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${rx}" fill="#fff"/></svg>`);
    return sharp(buffer).composite([{ input: masque, blend: 'dest-in' }]).png().toBuffer();
  }

  // Fenêtre d'ordinateur : barre de titre à trois points, capture en dessous
  async function fenetre(fichier, largeur) {
    const BARRE = 34, RX = 12;
    const capture = await sharp(fichier).resize({ width: largeur }).png().toBuffer();
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

  // Téléphone : contour sombre et écran arrondi
  async function telephone(fichier, largeurEcran) {
    const BORD = 12, RX = 38;
    const ecran = await sharp(fichier).resize({ width: largeurEcran }).png().toBuffer();
    const { height } = await sharp(ecran).metadata();
    const w = largeurEcran + BORD * 2, h = height + BORD * 2;
    const corps = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${RX}" fill="#1c1c1e"/></svg>`);
    const ecranArrondi = await arrondir(ecran, largeurEcran, height, RX - BORD);
    const buffer = await sharp(corps).composite([{ input: ecranArrondi, top: BORD, left: BORD }]).png().toBuffer();
    return { buffer, w, h, rx: RX };
  }

  // Image posée telle quelle (planche), coins arrondis
  async function planche(fichier, largeur, rx = 18) {
    const image = await sharp(fichier).resize({ width: largeur }).png().toBuffer();
    const { height } = await sharp(image).metadata();
    return { buffer: await arrondir(image, largeur, height, rx), w: largeur, h: height, rx };
  }

  async function poser(calques, element, left, top) {
    const o = await ombrePortee(element.w, element.h, element.rx);
    calques.push({ input: o.buffer, left: left - o.marge, top: top - o.marge });
    calques.push({ input: element.buffer, left, top });
  }

  async function enregistrer(calques, dossier, nom, jpgAussi = false) {
    const decales = calques.map(c => ({ ...c, left: Math.round(c.left + M), top: Math.round(c.top + M) }));
    const brut = await fondImage().composite(decales).png().toBuffer();
    const image = await sharp(brut).extract({ left: M, top: M, width: W, height: H }).png().toBuffer();
    fs.mkdirSync(dossier, { recursive: true });
    await sharp(image).webp({ quality: 84 }).toFile(path.join(dossier, nom + '.webp'));
    if (jpgAussi) await sharp(image).jpeg({ quality: 86 }).toFile(path.join(dossier, nom + '.jpg'));
    console.log(nom, Math.round(fs.statSync(path.join(dossier, nom + '.webp')).size / 1024) + ' Ko');
  }

  return { W, H, fenetre, telephone, planche, poser, enregistrer };
}

module.exports = { creer };
