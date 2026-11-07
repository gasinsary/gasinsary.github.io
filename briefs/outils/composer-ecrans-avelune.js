// Reprend le module de mise en scène déjà utilisé pour Vellane et Voolapp.
// NODE_PATH doit contenir sharp. Usage : node composer-ecrans-avelune.js
const path = require('path');
const { creer } = require('./mise-en-scene');
const source = path.resolve(__dirname, '../maison-avelune/captures');
const sortie = path.resolve(__dirname, '../../portfolio/site-hotel-restaurant-reservation-maison-avelune/img');
const S = creer({fond:'#eeeade',tache1:'#dce2d2',tache2:'#e1d2bd',ombre:'#273b30'});
const f = nom => path.join(source, nom + '.png');
(async () => {
  const fen = await S.fenetre(f('accueil'), 800);
  const tel = await S.telephone(f('mobile-accueil'), 220);
  const cover=[];
  await S.poser(cover,fen,32,53);
  await S.poser(cover,tel,744,140);
  await S.enregistrer(cover,sortie,'couverture',true);
  for(const [capture,nom] of [['accueil','accueil-hotel'],['disponibilites','disponibilites-chambres'],['reservation','reservation-recapitulatif'],['confirmation','confirmation-sejour'],['restaurant','restaurant']]){
    const el=await S.fenetre(f(capture),920);const layers=[];
    await S.poser(layers,el,(S.W-el.w)/2,(S.H-el.h)/2);
    await S.enregistrer(layers,sortie,nom);
  }
  const t1=await S.telephone(f('mobile-accueil'),252),t2=await S.telephone(f('mobile-disponibilites'),252),layers=[];
  await S.poser(layers,t1,190,42);await S.poser(layers,t2,558,70);
  await S.enregistrer(layers,sortie,'reservation-mobile');
})().catch(e=>{console.error(e);process.exit(1)});
