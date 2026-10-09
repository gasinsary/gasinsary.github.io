// Capture les pages de la maquette Maison Vellane avec Chrome (puppeteer-core).
// Usage : node capturer.js <dossier-de-sortie>
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const SORTIE = path.resolve(process.argv[2] || path.join(__dirname, 'captures'));
const SITE = 'file:///' + path.join(__dirname, 'site').replace(/\\/g, '/');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// [nom, page, largeur, hauteur, échelle, élément à placer en haut de l'écran (ou null)]
const CAPTURES = [
  ['accueil', 'index.html', 1440, 900, 1, null],
  ['accueil-biscuits', 'index.html', 1440, 900, 1, '#biscuits'],
  ['accueil-savoir-faire', 'index.html', 1440, 900, 1, '#savoir-faire'],
  ['accueil-professionnels', 'index.html', 1440, 900, 1, '#professionnels'],
  ['accueil-points-de-vente', 'index.html', 1440, 900, 1, '#points-de-vente'],
  ['biscuits', 'biscuits.html', 1440, 900, 1, null],
  ['professionnels', 'professionnels.html', 1440, 900, 1, null],
  ['mobile', 'index.html', 390, 844, 2, null],
  ['mobile-biscuits', 'index.html', 390, 844, 2, '#biscuits'],
  ['identite', 'identite.html', 1536, 1024, 1, null],
];

(async () => {
  fs.mkdirSync(SORTIE, { recursive: true });
  const navigateur = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
  const page = await navigateur.newPage();
  for (const [nom, fichier, w, h, echelle, cible] of CAPTURES) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: echelle });
    await page.goto(`${SITE}/${fichier}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    if (cible) await page.evaluate(sel => window.scrollTo(0, document.querySelector(sel).getBoundingClientRect().top + window.scrollY), cible);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(SORTIE, nom + '.png') });
    console.log(nom);
  }
  await navigateur.close();
})().catch(e => { console.error(e); process.exit(1); });
