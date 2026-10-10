// Visuels du service ComeUp « site vitrine sur mesure ou refonte ».
// Usage : node rendre.js   (demande puppeteer-core et sharp)
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const puppeteer = require('puppeteer-core');

const ICI = __dirname;
const SORTIE = path.join(ICI, 'sortie');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = f => 'file:///' + path.join(ICI, f).replace(/\\/g, '/');
const GALERIE = ['galerie-1', 'galerie-2', 'galerie-3', 'galerie-4', 'galerie-5'];

(async () => {
  fs.mkdirSync(SORTIE, { recursive: true });
  const nav = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
  const page = await nav.newPage();
  for (const nom of GALERIE) {
    await page.setViewport({ width: 1260, height: 708, deviceScaleFactor: 2, isMobile: false });
    await page.goto(url(nom + '.html'), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot();
    await sharp(png).resize(1260, 708).jpeg({ quality: 92 }).toFile(path.join(SORTIE, nom + '.jpg'));
    console.log(nom);
  }
  await nav.close();
})().catch(e => { console.error(e); process.exit(1); });
