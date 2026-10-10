// Rend couverture.html en JPG 1600 × 400. Lancer depuis la racine : node briefs/codeur/rendre-couverture.js
const puppeteer = require('puppeteer-core');
const path = require('path');
(async () => {
  const nav = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--allow-file-access-from-files'] });
  const page = await nav.newPage();
  await page.setViewport({ width: 1600, height: 400 });
  await page.goto('file:///' + path.join(__dirname, 'couverture.html').split(path.sep).join('/'), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'sortie', 'codeur-couverture.jpg'), type: 'jpeg', quality: 90 });
  await nav.close();
})();
