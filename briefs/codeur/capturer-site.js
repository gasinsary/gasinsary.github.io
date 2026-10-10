// Capture de l'accueil du site (production) pour la couverture Codeur.
// Demande puppeteer-core et Chrome. Lancer depuis la racine : node briefs/codeur/capturer-site.js
const puppeteer = require('puppeteer-core');
const path = require('path');
(async () => {
  const nav = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await nav.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('https://gasinsary.github.io/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(__dirname, 'captures', 'accueil.png') });
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(__dirname, 'captures', 'mobile.png') });
  await nav.close();
})();
