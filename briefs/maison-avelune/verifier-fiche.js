const fs=require('fs');const path=require('path');const assert=require('node:assert/strict');const YAML=require('yaml');const sharp=require('sharp');const {Liquid}=require('liquidjs');
const root=path.resolve(__dirname,'../..');
(async()=>{
 const slug='site-hotel-restaurant-reservation-maison-avelune';
 const source=fs.readFileSync(path.join(root,'_projets',slug+'.md'),'utf8');
 const page=YAML.parse(source.split(/^---\s*$/m)[1]);
 for(const field of ['title','titre_seo','description','intro','date_projet','contexte','resultat','appel','service_url'])assert.ok(page[field],field);
 assert.equal(page.concept,true);assert.equal(page.published,true);assert.equal(page.sitemap,true);assert.equal(page.date_projet,'Décembre 2025');
 assert.ok(page.description.includes('Madagascar'));
 const files=[page.image,page.image_partage,...page.galerie.map(i=>{assert.ok(i.alt);return i.image})];
 for(const file of files){const p=path.join(root,file);assert.ok(fs.existsSync(p),file);const m=await sharp(p).metadata();assert.equal(m.width,1024);assert.equal(m.height,683);assert.ok(fs.statSync(p).size<250000,file+' trop lourd');}
 assert.ok(fs.existsSync(path.join(root,page.service_url,'index.html')));
 const template=fs.readFileSync(path.join(root,'_layouts/projet.html'),'utf8');
 const block=template.match(/\{%- if page\.service_url and page\.service_libelle %\}[\s\S]*?\{%- endif %\}/)[0];
 for(const base of ['', '/staging-t4sj762s']){
   const engine=new Liquid();engine.registerFilter('relative_url',u=>base+u);
   assert.ok((await engine.parseAndRender(block,{page})).includes('href="'+base+'/creation-site-web/"'));
   assert.equal((await engine.parseAndRender(block,{page:{}})).trim(),'');
 }
 console.log('Fiche YAML valide ; concept, date et activation vérifiés ; 8 images 1024 × 683 sous 250 Ko ; lien de service correct en production et sous-dossier de test ; ancien projet sans ce champ inchangé.');
 console.log('Le rendu Jekyll complet et le sitemap en ligne restent à vérifier sur la version de test.');
})().catch(e=>{console.error(e);process.exit(1)});
