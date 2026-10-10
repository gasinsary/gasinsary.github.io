// Visuels du service ComeUp « maquette de refonte de la page d'accueil ».
// 1. capture le faux ancien site de Maison Vellane (avant) ; 2. rend les images de présentation (1260 × 708).
// L'« après » vient des captures déjà faites dans briefs/maison-vellane/captures/.
// Usage : node rendre.js   (demande puppeteer-core et sharp)
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const puppeteer = require('puppeteer-core');

const ICI = __dirname;
const SORTIE = path.join(ICI, 'sortie');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = f => 'file:///' + path.join(ICI, f).replace(/\\/g, '/');
const GALERIE = ['galerie-1', 'galerie-2', 'galerie-3', 'galerie-4'];

(async () => {
  fs.mkdirSync(SORTIE, { recursive: true });
  const nav = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
  const page = await nav.newPage();
  // L'avant, sur ordinateur puis sur téléphone (sans balise viewport, la page s'affiche réduite)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url('avant-vellane.html'), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SORTIE, 'avant-ordinateur.png') });
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto(url('avant-vellane.html'), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SORTIE, 'avant-mobile.png') });
  console.log('avant');
  for (const nom of (process.argv[2] === 'avant' ? [] : GALERIE)) {
    await page.setViewport({ width: 1260, height: 708, deviceScaleFactor: 2, isMobile: false });
    await page.goto(url(nom + '.html'), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot();
    await sharp(png).resize(1260, 708).jpeg({ quality: 92 }).toFile(path.join(SORTIE, nom + '.jpg'));
    console.log(nom);
  }
  await nav.close();
})().catch(e => { console.error(e); process.exit(1); });
