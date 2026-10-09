// Met en scène les captures de la maquette Maison Vellane pour le portfolio.
// Usage : node composer-ecrans-vellane.js <dossier-des-captures> <dossier-de-sortie>
const path = require('path');
const { creer } = require('./mise-en-scene');

const SOURCE = path.resolve(process.argv[2]);
const SORTIE = path.resolve(process.argv[3]);
const S = creer({ fond: '#f3ede2', tache1: '#e7dcc6', tache2: '#dfe4d6', ombre: '#3a2a1f' });
const f = nom => path.join(SOURCE, nom + '.png');

async function sceneFenetre(capture, nom) {
  const fen = await S.fenetre(f(capture), 900);
  const calques = [];
  await S.poser(calques, fen, (S.W - fen.w) / 2, (S.H - fen.h) / 2);
  await S.enregistrer(calques, SORTIE, nom);
}

(async () => {
  // Couverture : l'accueil sur ordinateur et sur téléphone
  {
    const fen = await S.fenetre(f('accueil'), 800);
    const tel = await S.telephone(f('mobile'), 232);
    const calques = [];
    await S.poser(calques, fen, 40, 52);
    await S.poser(calques, tel, S.W - tel.w - 44, S.H - tel.h - 26);
    await S.enregistrer(calques, SORTIE, 'couverture', true);
  }
  // Planche d'identité
  {
    const p = await S.planche(f('identite'), 880);
    const calques = [];
    await S.poser(calques, p, (S.W - p.w) / 2, (S.H - p.h) / 2);
    await S.enregistrer(calques, SORTIE, 'identite');
  }
  // Fenêtres
  for (const [capture, nom] of [['accueil', 'accueil'], ['accueil-savoir-faire', 'savoir-faire'], ['biscuits', 'biscuits'],
    ['accueil-professionnels', 'professionnels-accueil'], ['professionnels', 'professionnels'], ['accueil-points-de-vente', 'points-de-vente']]) {
    await sceneFenetre(capture, nom);
  }
  // Deux téléphones côte à côte
  {
    const t1 = await S.telephone(f('mobile'), 272);
    const t2 = await S.telephone(f('mobile-biscuits'), 272);
    const calques = [];
    const ecart = 70, total = t1.w + t2.w + ecart;
    await S.poser(calques, t1, (S.W - total) / 2, (S.H - t1.h) / 2 - 14);
    await S.poser(calques, t2, (S.W - total) / 2 + t1.w + ecart, (S.H - t2.h) / 2 + 14);
    await S.enregistrer(calques, SORTIE, 'mobile');
  }
})().catch(e => { console.error(e); process.exit(1); });
