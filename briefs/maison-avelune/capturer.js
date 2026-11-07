// Contrôle du parcours réel de la maquette et captures pour le portfolio.
// Dépendances externes au dépôt : puppeteer-core. Chrome déjà installé.
const path=require('path');const fs=require('fs');const assert=require('node:assert/strict');const puppeteer=require('puppeteer-core');
const base=process.env.AVELUNE_URL||'http://127.0.0.1:8765/';const out=path.join(__dirname,'captures');
async function main(){
 fs.mkdirSync(out,{recursive:true});
 const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
 const page=await browser.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url())});
 async function go(file){await page.goto(base+file,{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready)}
 async function shot(name){await page.screenshot({path:path.join(out,name+'.png')})}
 async function search(a,d,g='2'){
   await page.evaluate(([a,d,g])=>{document.querySelector('#arrival').value=a;document.querySelector('#departure').value=d;document.querySelector('#guests').value=g;document.querySelector('#search-form').requestSubmit()},[a,d,g]);
 }
 await page.setViewport({width:1440,height:900,deviceScaleFactor:1});await go('index.html');await shot('accueil');
 await page.evaluate(()=>document.querySelector('#restaurant').scrollIntoView());await page.evaluate(()=>window.scrollTo({top:document.querySelector('#restaurant').offsetTop-20,behavior:'instant'}));await shot('restaurant');
 await go('reservation.html');assert.equal(await page.$$eval('[data-room]:not(:disabled)',els=>els.length),2);await shot('disponibilites');
 await page.click('[data-room="jardin"]');assert.match(await page.$eval('#summary',e=>e.innerText),/290/);await shot('reservation');
 await page.type('[name="prenom"]','Camille');await page.type('[name="nom"]','Exemple');await page.type('[name="email"]','camille@example.com');await page.click('[type="checkbox"]');await page.click('#guest-form button[type="submit"]');
 assert.equal(await page.$eval('#confirmation',e=>e.hidden),false);assert.equal(await page.$eval('[name="email"]',e=>e.value),'');await shot('confirmation');
 await page.click('#restart');assert.equal(await page.$eval('#results',e=>e.hidden),false);
 await search('2025-12-20','2025-12-18');assert.match(await page.$eval('#error',e=>e.innerText),/départ ultérieur/);assert.equal(await page.$eval('#results',e=>e.children.length),0);
 await search('2025-12-25','2025-12-26');assert.equal(await page.$$eval('[data-room]:not(:disabled)',els=>els.length),0);assert.match(await page.$eval('#results',e=>e.innerText),/Aucune chambre disponible/);
 await search('2025-12-18','2025-12-20','3');assert.equal(await page.$$eval('[data-room]:not(:disabled)',els=>els.length),1);assert.equal(await page.$eval('[data-room]:not(:disabled)',e=>e.dataset.room),'suite');
 await search('2025-12-20','2025-12-21');assert.equal(await page.$$eval('[data-room]:not(:disabled)',els=>els.length),3); // Séjour adjacent, sans chevauchement.
 await go('reservation.html?arrivee=2025-12-20&depart=2025-12-22&voyageurs=3');assert.equal(await page.$eval('#guests',e=>e.value),'3');await page.click('[data-room="suite"]');assert.match(await page.$eval('#summary',e=>e.innerText),/420/);
 await page.click('#back');assert.equal(await page.$eval('#search-section',e=>e.hidden),false);
 for(const width of [390,320]){
   await page.setViewport({width,height:844,deviceScaleFactor:2});await go('index.html');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Débordement accueil '+width);
   if(width===390)await shot('mobile-accueil');
   await go('reservation.html');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Débordement disponibilités '+width);
   if(width===390)await shot('mobile-disponibilites');
   await page.click('[data-room="jardin"]');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Débordement formulaire '+width);
 }
 assert.deepEqual(errors,[]);
 const report='Contrôles réussis : réservation simulée complète, effacement des coordonnées, retour au choix, dates inversées, absence de disponibilités, capacité, séjours adjacents, montant total, paramètres depuis accueil, absence de débordement à 390 et 320 px, absence d’erreurs JavaScript et de ressources manquantes.\nAucune réservation réelle ni requête externe. Vérification Jekyll en ligne à effectuer après autorisation de commit et publication de test.\n';
 fs.writeFileSync(path.join(__dirname,'verification.txt'),report);console.log(report);
 }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exit(1)});
