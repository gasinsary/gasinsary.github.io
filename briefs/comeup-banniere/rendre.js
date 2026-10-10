// Rend les bannières d'exemple puis les images de présentation du service ComeUp (1260 × 708).
// Usage : node rendre.js   (demande puppeteer-core et sharp)
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const puppeteer = require('puppeteer-core');

const ICI = __dirname;
const SORTIE = path.join(ICI, 'sortie');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = f => 'file:///' + path.join(ICI, f).replace(/\\/g, '/');

// [fichier HTML, nom de sortie, largeur, hauteur]
const BANNIERES = [
  ['banniere-voara.html', 'banniere-facebook-voara', 1640, 624],
  ['banniere-baofizz.html', 'banniere-youtube-baofizz', 2560, 1440],
  ['banniere-vellane.html', 'banniere-linkedin-vellane', 1584, 396],
];
const GALERIE = ['galerie-1', 'galerie-2', 'galerie-3', 'galerie-4'];

(async () => {
  fs.mkdirSync(SORTIE, { recursive: true });
  const nav = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
  const page = await nav.newPage();
  for (const [fichier, nom, w, h] of BANNIERES) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto(url(fichier), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(SORTIE, nom + '.png') });
    console.log(nom);
  }
  // La bannière YouTube telle qu'on la voit sur ordinateur : la bande centrale
  await sharp(path.join(SORTIE, 'banniere-youtube-baofizz.png')).extract({ left: 0, top: 508, width: 2560, height: 423 }).png().toFile(path.join(SORTIE, 'banniere-youtube-baofizz-ordinateur.png'));
  for (const nom of (process.argv[2] === 'bannieres' ? [] : GALERIE)) {
    await page.setViewport({ width: 1260, height: 708, deviceScaleFactor: 2 });
    await page.goto(url(nom + '.html'), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot();
    await sharp(png).resize(1260, 708).jpeg({ quality: 92 }).toFile(path.join(SORTIE, nom + '.jpg'));
    console.log(nom);
  }
  await nav.close();
  // Les bannières aussi en JPG, pour le portfolio ComeUp
  for (const [, nom] of BANNIERES) await sharp(path.join(SORTIE, nom + '.png')).jpeg({ quality: 90 }).toFile(path.join(SORTIE, nom + '.jpg'));
})().catch(e => { console.error(e); process.exit(1); });
