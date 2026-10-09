// Illustrations du projet concept Maison Vellane (biscuiterie fictive) : biscuits, boîte métal, plan de travail, coffrets.
// Usage : node generer-illustrations.js   (écrit les fichiers SVG dans ./illus/)
const fs = require('fs');
const path = require('path');
const SORTIE = path.join(__dirname, 'illus');

const C = {
  creme: '#f6efe3', cremeFonce: '#ecdfc9', brun: '#3a2a1f', caramel: '#c27a3e', terracotta: '#b5562f',
  or: '#e3ad63', orClair: '#f0c98d', orFonce: '#c98b46', chocolat: '#5b3a29', chocolatClair: '#7a4f37',
  sauge: '#8a9a78', saugeFonce: '#5f6e52', amande: '#e9d3b0', blanc: '#fffaf2',
};

const DEFS = `<defs>
  <filter id="ombre" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0.16 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
</defs>`;

function svg(w, h, contenu, fond) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${DEFS}${fond ? `<rect width="${w}" height="${h}" fill="${fond}"/>` : ''}${contenu}</svg>`;
}

// Bord cannelé d'un sablé
function cannele(cx, cy, r, n = 26, relief = 0.09) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a0 = (2 * Math.PI * i) / n, a1 = (2 * Math.PI * (i + 1)) / n, am = (a0 + a1) / 2;
    const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)];
    const pc = [cx + r * (1 + relief * 2) * Math.cos(am), cy + r * (1 + relief * 2) * Math.sin(am)];
    const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
    d += (i === 0 ? `M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} ` : '') + `Q ${pc[0].toFixed(1)} ${pc[1].toFixed(1)} ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} `;
  }
  return d + 'Z';
}

function ombrePortee(cx, cy, rx, ry, opacite = 0.28) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${C.brun}" opacity="${opacite}" filter="url(#ombre)"/>`;
}

let idClip = 0;

// Sablé rond cannelé, vu de dessus ; variante : 'nature', 'chocolat', 'galette', 'citron'
function sable(cx, cy, r, variante = 'nature', rotation = 0) {
  const id = `c${idClip++}`;
  let s = ombrePortee(cx + r * 0.08, cy + r * 0.16, r * 1.02, r * 0.98);
  s += `<g transform="rotate(${rotation} ${cx} ${cy})">`;
  s += `<clipPath id="${id}"><path d="${cannele(cx, cy, r)}"/></clipPath>`;
  s += `<path d="${cannele(cx, cy, r)}" fill="${variante === 'galette' ? C.orFonce : C.or}"/>`;
  s += `<g clip-path="url(#${id})">`;
  s += `<circle cx="${cx - r * 0.25}" cy="${cy - r * 0.3}" r="${r * 0.9}" fill="${C.orClair}" opacity="0.45"/>`;
  s += `<circle cx="${cx + r * 0.4}" cy="${cy + r * 0.45}" r="${r * 0.8}" fill="${C.orFonce}" opacity="0.35"/>`;
  if (variante === 'galette') {
    // quadrillage de la galette au caramel
    for (let k = -4; k <= 4; k++) {
      s += `<path d="M ${cx - r * 1.5} ${cy + k * r * 0.24 - r * 1.5} l ${r * 3} ${r * 3}" stroke="${C.caramel}" stroke-width="${r * 0.035}" opacity="0.8"/>`;
      s += `<path d="M ${cx + r * 1.5} ${cy + k * r * 0.24 - r * 1.5} l ${-r * 3} ${r * 3}" stroke="${C.caramel}" stroke-width="${r * 0.035}" opacity="0.8"/>`;
    }
  }
  if (variante === 'chocolat') {
    // moitié trempée dans le chocolat, bord ondulé
    s += `<path d="M ${cx - r * 1.3} ${cy + r * 0.05} C ${cx - r * 0.6} ${cy - r * 0.12}, ${cx - r * 0.1} ${cy + r * 0.2}, ${cx + r * 0.4} ${cy + r * 0.02} S ${cx + r * 1.1} ${cy - r * 0.1}, ${cx + r * 1.3} ${cy + r * 0.04} L ${cx + r * 1.3} ${cy + r * 1.3} L ${cx - r * 1.3} ${cy + r * 1.3} Z" fill="${C.chocolat}"/>`;
    s += `<path d="M ${cx - r * 0.7} ${cy + r * 0.32} q ${r * 0.5} ${-r * 0.1} ${r * 1.1} ${r * 0.08}" stroke="${C.chocolatClair}" stroke-width="${r * 0.06}" fill="none" stroke-linecap="round" opacity="0.7"/>`;
  }
  if (variante === 'citron') {
    s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.78}" fill="#f6e7b0"/>`;
    s += `<circle cx="${cx - r * 0.2}" cy="${cy - r * 0.25}" r="${r * 0.4}" fill="#fff6d6" opacity="0.6"/>`;
    for (let k = 0; k < 7; k++) {
      const a = k * 0.9;
      s += `<path d="M ${cx + Math.cos(a) * r * 0.3} ${cy + Math.sin(a) * r * 0.3} q ${r * 0.08} ${-r * 0.05} ${r * 0.16} 0" stroke="#e2b93b" stroke-width="${r * 0.04}" fill="none" stroke-linecap="round"/>`;
    }
  }
  s += `</g>`;
  if (variante !== 'galette' && variante !== 'citron') {
    // bourrelet intérieur et trous de piquage
    s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.8}" fill="none" stroke="${C.orFonce}" stroke-width="${r * 0.03}" opacity="0.5"/>`;
    const trous = variante === 'chocolat' ? [[-0.35, -0.42], [0, -0.52], [0.35, -0.42], [-0.18, -0.2], [0.18, -0.2]] : [[-0.35, -0.35], [0, -0.45], [0.35, -0.35], [-0.45, 0], [0, 0], [0.45, 0], [-0.35, 0.35], [0, 0.45], [0.35, 0.35]];
    for (const [dx, dy] of trous) s += `<circle cx="${cx + dx * r}" cy="${cy + dy * r}" r="${r * 0.035}" fill="${C.orFonce}"/>`;
  }
  s += `</g>`;
  return s;
}

// Croquant aux amandes : forme irrégulière et amandes effilées
function croquant(cx, cy, r, rotation = 0) {
  let s = ombrePortee(cx + r * 0.08, cy + r * 0.14, r * 1.1, r * 0.85);
  s += `<g transform="rotate(${rotation} ${cx} ${cy})">`;
  s += `<path d="M ${cx - r} ${cy} C ${cx - r} ${cy - r * 0.8}, ${cx - r * 0.2} ${cy - r * 0.95}, ${cx + r * 0.3} ${cy - r * 0.82} S ${cx + r * 1.1} ${cy - r * 0.3}, ${cx + r * 1.05} ${cy + r * 0.15} S ${cx + r * 0.5} ${cy + r * 0.85}, ${cx - r * 0.1} ${cy + r * 0.8} S ${cx - r} ${cy + r * 0.6}, ${cx - r} ${cy} Z" fill="${C.orFonce}"/>`;
  s += `<path d="M ${cx - r * 0.8} ${cy - r * 0.1} C ${cx - r * 0.7} ${cy - r * 0.6}, ${cx} ${cy - r * 0.75}, ${cx + r * 0.5} ${cy - r * 0.55}" stroke="${C.orClair}" stroke-width="${r * 0.18}" fill="none" stroke-linecap="round" opacity="0.5"/>`;
  const amandes = [[-0.45, -0.25, 20], [0.05, -0.4, -30], [0.5, -0.1, 50], [-0.25, 0.3, -10], [0.3, 0.35, 70], [-0.6, 0.15, 80]];
  for (const [dx, dy, a] of amandes) {
    s += `<ellipse cx="${cx + dx * r}" cy="${cy + dy * r}" rx="${r * 0.2}" ry="${r * 0.08}" fill="${C.amande}" transform="rotate(${a} ${cx + dx * r} ${cy + dy * r})"/>`;
    s += `<ellipse cx="${cx + dx * r}" cy="${cy + dy * r}" rx="${r * 0.2}" ry="${r * 0.08}" fill="none" stroke="#c9a77a" stroke-width="${r * 0.02}" transform="rotate(${a} ${cx + dx * r} ${cy + dy * r})"/>`;
  }
  return s + `</g>`;
}

// Épi de blé
function epi(x, y, h, angle, couleur = C.caramel) {
  let s = `<g transform="rotate(${angle} ${x} ${y})"><path d="M ${x} ${y} L ${x} ${y - h}" stroke="${couleur}" stroke-width="3" stroke-linecap="round"/>`;
  for (let k = 0; k < 6; k++) {
    const yy = y - h * 0.45 - k * h * 0.09;
    s += `<ellipse cx="${x - 9}" cy="${yy}" rx="11" ry="5" fill="${couleur}" transform="rotate(-35 ${x - 9} ${yy})"/>`;
    s += `<ellipse cx="${x + 9}" cy="${yy}" rx="11" ry="5" fill="${couleur}" transform="rotate(35 ${x + 9} ${yy})"/>`;
  }
  return s + `<ellipse cx="${x}" cy="${y - h - 4}" rx="5" ry="10" fill="${couleur}"/></g>`;
}

function miettes(cx, cy, n, etendue, graine = 1) {
  let s = '', g = graine;
  const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
  for (let i = 0; i < n; i++) s += `<circle cx="${cx + (alea() - 0.5) * etendue}" cy="${cy + (alea() - 0.5) * etendue * 0.6}" r="${1.5 + alea() * 3.5}" fill="${alea() > 0.5 ? C.or : C.orFonce}"/>`;
  return s;
}

// Boîte métal ronde, couvercle posé à côté
function boite(cx, cy, r, couleur = C.saugeFonce) {
  let s = ombrePortee(cx + 14, cy + 30, r * 1.08, r * 0.98, 0.3);
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${couleur}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.93}" fill="#e9e2d2"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.9}" fill="#f3ead9"/>`;
  // papier dentelle
  s += `<path d="${cannele(cx, cy, r * 0.86, 40, 0.04)}" fill="${C.blanc}"/>`;
  return s;
}

function couvercle(cx, cy, r, couleur = C.saugeFonce) {
  let s = ombrePortee(cx + 10, cy + 22, r * 1.04, r * 0.96, 0.25);
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${couleur}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.86}" fill="none" stroke="${C.cremeFonce}" stroke-width="3" opacity="0.6"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.52}" fill="${C.creme}"/>`;
  s += embleme(cx, cy - r * 0.06, r * 0.26, C.saugeFonce);
  s += `<path d="M ${cx - r * 0.32} ${cy + r * 0.3} h ${r * 0.64}" stroke="${C.saugeFonce}" stroke-width="5" stroke-linecap="round"/>`;
  s += `<path d="M ${cx - r * 0.22} ${cy + r * 0.4} h ${r * 0.44}" stroke="${C.saugeFonce}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>`;
  return s;
}

// Emblème de la marque : un sablé cannelé marqué d'un V
function embleme(cx, cy, r, couleur) {
  let s = `<path d="${cannele(cx, cy, r, 18, 0.1)}" fill="none" stroke="${couleur}" stroke-width="${Math.max(2, r * 0.09)}"/>`;
  s += `<path d="M ${cx - r * 0.42} ${cy - r * 0.38} L ${cx} ${cy + r * 0.45} L ${cx + r * 0.42} ${cy - r * 0.38}" fill="none" stroke="${couleur}" stroke-width="${Math.max(2.5, r * 0.13)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return s;
}

// ---------------------------------------------------------------- Compositions
const FICHIERS = {};

// Illustration principale de l'accueil : la boîte ouverte, les biscuits, les épis
FICHIERS['hero.svg'] = svg(900, 760, (() => {
  let s = `<circle cx="470" cy="390" r="330" fill="${C.cremeFonce}"/>`;
  s += epi(170, 600, 230, -28) + epi(200, 610, 200, -12, C.orFonce);
  s += couvercle(700, 560, 150);
  s += boite(420, 360, 230);
  s += sable(330, 300, 92, 'nature', 10) + sable(500, 270, 88, 'chocolat', -20) + sable(470, 450, 92, 'galette', 5) + sable(300, 470, 80, 'nature', 40) + sable(600, 420, 74, 'citron', 0);
  s += croquant(770, 250, 60, 20) + sable(140, 330, 58, 'chocolat', 70);
  s += miettes(620, 650, 26, 160, 3) + miettes(200, 230, 14, 90, 7);
  return s;
})());

// Les quatre biscuits de la gamme, chacun sur son fond
const produits = [
  ['sable-nature.svg', '#efe2cb', (cx, cy) => sable(cx, cy, 120, 'nature', 12)],
  ['sable-chocolat.svg', '#ead7c8', (cx, cy) => sable(cx, cy, 120, 'chocolat', -8)],
  ['galette-caramel.svg', '#f0dcc0', (cx, cy) => sable(cx, cy, 120, 'galette', 18)],
  ['croquant-amandes.svg', '#e6e3d2', (cx, cy) => croquant(cx, cy, 118, -12)],
  ['palet-citron.svg', '#f3ebc8', (cx, cy) => sable(cx, cy, 116, 'citron', 0)],
];
for (const [nom, fond, dessin] of produits) {
  FICHIERS[nom] = svg(600, 450, `<circle cx="300" cy="225" r="175" fill="${C.blanc}" opacity="0.55"/>` + dessin(300, 220) + miettes(430, 340, 9, 70, nom.length), fond);
}

// Coffrets : boîte métal fermée et pile de biscuits
FICHIERS['coffret-decouverte.svg'] = svg(600, 450, (() => {
  let s = couvercle(250, 230, 130);
  s += sable(450, 300, 70, 'nature', 20) + sable(430, 170, 62, 'chocolat', -10) + croquant(500, 220, 46, 30);
  return s;
})(), '#e3e6d8');
FICHIERS['boite-collector.svg'] = svg(600, 450, (() => {
  let s = couvercle(300, 225, 160, C.terracotta);
  return s + miettes(470, 360, 10, 80, 5);
})(), '#f1e1d4');
FICHIERS['mini-sachets.svg'] = svg(600, 450, (() => {
  let s = '';
  [[170, 230, -10], [300, 210, 4], [430, 235, 12]].forEach(([x, y, a], i) => {
    s += ombrePortee(x + 8, y + 70, 70, 20, 0.2);
    s += `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 66}" y="${y - 96}" width="132" height="182" rx="10" fill="${[C.blanc, '#f4ecdc', C.blanc][i]}"/>`;
    s += `<path d="M ${x - 66} ${y - 78} h 132" stroke="${C.cremeFonce}" stroke-width="3" stroke-dasharray="6 5"/>`;
    s += embleme(x, y - 22, 26, [C.saugeFonce, C.terracotta, C.chocolat][i]);
    s += `<rect x="${x - 40}" y="${y + 22}" width="80" height="9" rx="4.5" fill="${C.brun}" opacity="0.7"/><rect x="${x - 28}" y="${y + 40}" width="56" height="7" rx="3.5" fill="${C.brun}" opacity="0.35"/></g>`;
  });
  return s;
})(), '#ece6dc');
FICHIERS['assortiment-pro.svg'] = svg(600, 450, (() => {
  let s = ombrePortee(310, 330, 220, 40, 0.25);
  s += `<path d="M 110 200 L 490 200 L 470 340 L 130 340 Z" fill="#c9a77a"/><path d="M 110 200 L 490 200 L 486 222 L 114 222 Z" fill="#b48f60"/>`;
  s += `<rect x="230" y="262" width="140" height="44" rx="6" fill="${C.blanc}"/>` + embleme(262, 284, 14, C.brun) + `<rect x="284" y="276" width="70" height="7" rx="3.5" fill="${C.brun}"/><rect x="284" y="290" width="48" height="6" rx="3" fill="${C.brun}" opacity="0.5"/>`;
  s += sable(190, 180, 52, 'nature', 10) + sable(290, 165, 56, 'galette', -5) + sable(400, 178, 52, 'chocolat', 20) + croquant(330, 205, 36, 15);
  return s;
})(), '#e9e1d3');

// Le savoir-faire : plan de travail, pâte étalée, emporte-pièce, rouleau
FICHIERS['savoir-faire.svg'] = svg(900, 700, (() => {
  let s = `<rect width="900" height="700" fill="#d9c3a2"/>`;
  for (let k = 0; k < 9; k++) s += `<path d="M 0 ${60 + k * 80} C 300 ${40 + k * 80}, 600 ${90 + k * 80}, 900 ${55 + k * 80}" stroke="#cdb38d" stroke-width="3" fill="none" opacity="0.7"/>`;
  s += `<rect width="900" height="700" fill="#d9c3a2" filter="url(#grain)" opacity="0.6"/>`;
  // farine
  for (let k = 0; k < 140; k++) { const a = k * 2.4, d = 40 + (k * 37) % 230; s += `<circle cx="${430 + Math.cos(a) * d * 1.3}" cy="${360 + Math.sin(a) * d * 0.8}" r="${1 + (k % 4)}" fill="#fbf6ec" opacity="0.8"/>`; }
  // pâte étalée avec découpes
  s += ombrePortee(440, 380, 290, 190, 0.22);
  s += `<path d="M 170 350 C 160 220, 320 170, 450 180 S 720 220, 720 340 S 600 540, 430 545 S 180 480, 170 350 Z" fill="#efd6a8"/>`;
  [[300, 300], [440, 280], [580, 320], [360, 430], [510, 440]].forEach(([x, y], i) => {
    if (i < 3) s += `<path d="${cannele(x, y, 56, 22, 0.09)}" fill="#e7c88f" stroke="#d9b273" stroke-width="2"/>`;
    else s += `<path d="${cannele(x, y, 56, 22, 0.09)}" fill="none" stroke="#d9b273" stroke-width="3" stroke-dasharray="4 4"/>`;
  });
  // emporte-pièce
  s += `<path d="${cannele(758, 552, 66, 22, 0.09)}" fill="none" stroke="#7a5d3c" stroke-width="12" opacity="0.18"/><path d="${cannele(750, 540, 66, 22, 0.09)}" fill="none" stroke="#b9bcc0" stroke-width="12"/><path d="${cannele(750, 540, 66, 22, 0.09)}" fill="none" stroke="#e6e8ea" stroke-width="4"/>`;
  // rouleau à pâtisserie
  s += `<g transform="rotate(-24 300 600)">${ombrePortee(300, 625, 260, 22, 0.3)}<rect x="90" y="575" width="420" height="52" rx="26" fill="#d29b5d"/><rect x="90" y="580" width="420" height="14" rx="7" fill="#e6b77c" opacity="0.8"/><rect x="20" y="589" width="80" height="24" rx="12" fill="#b77c42"/><rect x="500" y="589" width="80" height="24" rx="12" fill="#b77c42"/></g>`;
  // sablés cuits sur le côté
  s += sable(140, 120, 58, 'nature', 0) + sable(250, 90, 50, 'nature', 30) + epi(820, 230, 170, 18, C.caramel);
  return s;
})());

// Le bandeau professionnels : boîtes empilées avec ruban
FICHIERS['professionnels.svg'] = svg(900, 700, (() => {
  let s = `<circle cx="450" cy="360" r="300" fill="#4a372a"/>`;
  const pile = (x, y, w, h, couleur, ruban) => {
    let t = ombrePortee(x + w / 2 + 10, y + h + 8, w * 0.55, 18, 0.35);
    t += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${couleur}"/><rect x="${x}" y="${y}" width="${w}" height="${h * 0.22}" rx="10" fill="#000" opacity="0.12"/>`;
    t += `<rect x="${x + w / 2 - 12}" y="${y}" width="24" height="${h}" fill="${ruban}"/>`;
    return t;
  };
  s += pile(250, 420, 400, 150, C.saugeFonce, C.or);
  s += pile(300, 300, 300, 120, C.terracotta, C.creme);
  s += pile(350, 200, 200, 100, C.creme, C.terracotta);
  s += `<path d="M 450 200 C 410 150, 360 170, 400 196 M 450 200 C 490 150, 540 170, 500 196" stroke="${C.terracotta}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="404" y="232" width="92" height="40" rx="6" fill="${C.blanc}"/>` + embleme(424, 252, 12, C.brun) + `<rect x="442" y="246" width="40" height="6" rx="3" fill="${C.brun}"/><rect x="442" y="257" width="28" height="5" rx="2.5" fill="${C.brun}" opacity="0.5"/>`;
  s += sable(190, 560, 50, 'nature', 10) + sable(720, 560, 46, 'chocolat', -10) + croquant(170, 470, 34, 30);
  return s;
})());

// Logo : emblème et nom (le nom est en typographie dans les pages ; ici l'emblème seul)
FICHIERS['embleme.svg'] = svg(120, 120, embleme(60, 60, 44, C.brun));
FICHIERS['embleme-clair.svg'] = svg(120, 120, embleme(60, 60, 44, C.creme));

fs.mkdirSync(SORTIE, { recursive: true });
for (const [nom, contenu] of Object.entries(FICHIERS)) fs.writeFileSync(path.join(SORTIE, nom), contenu);
console.log(Object.keys(FICHIERS).length, 'illustrations écrites dans', SORTIE);
