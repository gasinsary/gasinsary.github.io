// Génère les illustrations de couverture des premiers articles du blog (1024 × 683).
// Usage : node generer-visuels-blog.js <dossier-du-site>
// Demande le module « sharp » (npm install sharp). Les textes utilisent la police Segoe UI de Windows.
// Chaque illustration est écrite en WebP (pour la page) et en JPG (pour les partages sur les réseaux sociaux).
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const SITE = path.resolve(process.argv[2] || '.');
const SORTIE = path.join(SITE, 'assets', 'img', 'blog');
const W = 1024, H = 683;

// Couleurs du site
const NUIT = '#0f2943', BLEU = '#1c99bb', ORANGE = '#e87532', ROUGE = '#d5241a', BLANC = '#ffffff';
const GRIS = '#c8d5de', GRIS_CLAIR = '#e6edf2';
const POLICE = "font-family=\"Segoe UI, Arial, sans-serif\"";

// Petit logo fictif utilisé dans toutes les illustrations : un disque, une vague, un point.
function marque(cx, cy, r, couleur = BLEU, vague = BLANC, point = ORANGE) {
  const e = (0.2 * r).toFixed(1);
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${couleur}"/>
    <path d="M ${cx - 0.52 * r} ${cy + 0.12 * r} C ${cx - 0.2 * r} ${cy - 0.5 * r}, ${cx + 0.2 * r} ${cy + 0.5 * r}, ${cx + 0.52 * r} ${cy - 0.12 * r}" fill="none" stroke="${vague}" stroke-width="${e}" stroke-linecap="round"/>
    ${point ? `<circle cx="${cx + 0.78 * r}" cy="${cy - 0.78 * r}" r="${0.24 * r}" fill="${point}"/>` : ''}`;
}

// Carte blanche avec une ombre plate
function carte(x, y, w, h, r = 22, fond = BLANC) {
  return `<rect x="${x}" y="${y + 12}" width="${w}" height="${h}" rx="${r}" fill="${NUIT}" opacity="0.08"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fond}"/>`;
}

function barre(x, y, w, h = 12, couleur = GRIS) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${couleur}"/>`;
}

function texte(x, y, contenu, taille, couleur = NUIT, graisse = 700, ancre = 'middle') {
  return `<text x="${x}" y="${y}" ${POLICE} font-size="${taille}" font-weight="${graisse}" fill="${couleur}" text-anchor="${ancre}">${contenu}</text>`;
}

function decor(fond, tache1, tache2) {
  return `<rect width="${W}" height="${H}" fill="${fond}"/>
    <circle cx="120" cy="90" r="210" fill="${tache1}"/>
    <circle cx="930" cy="640" r="250" fill="${tache2}"/>`;
}

function svg(contenu) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${contenu}</svg>`;
}

// ---------------------------------------------------------------- 1. Logo, identité visuelle, charte graphique
function visuelDifferences() {
  const y = 132, h = 372, w = 252;
  const x1 = 86, x2 = 386, x3 = 686;
  let s = decor('#e6f3f8', '#d8ecf4', '#d3e9f2');

  // Le logo
  s += carte(x1, y, w, h);
  s += marque(x1 + w / 2, y + 150, 66);
  s += barre(x1 + w / 2 - 62, y + 262, 124, 16, NUIT);
  s += barre(x1 + w / 2 - 40, y + 292, 80, 10);

  // L'identité visuelle : couleurs, typographie, déclinaisons
  s += carte(x2, y, w, h);
  [NUIT, BLEU, ORANGE, '#f4e3d3'].forEach((c, i) => { s += `<circle cx="${x2 + 48 + i * 52}" cy="${y + 62}" r="21" fill="${c}"/>`; });
  s += texte(x2 + 40, y + 196, 'Aa', 92, NUIT, 700, 'start');
  s += barre(x2 + 164, y + 142, 56, 10) + barre(x2 + 164, y + 164, 44, 10) + barre(x2 + 164, y + 186, 56, 10);
  s += `<rect x="${x2 + 30}" y="${y + 242}" width="56" height="56" rx="14" fill="${GRIS_CLAIR}"/>` + marque(x2 + 58, y + 270, 17, BLEU, BLANC, null);
  s += `<rect x="${x2 + 98}" y="${y + 242}" width="56" height="56" rx="14" fill="${NUIT}"/>` + marque(x2 + 126, y + 270, 17, BLANC, NUIT, null);
  s += `<rect x="${x2 + 166}" y="${y + 242}" width="56" height="56" rx="14" fill="${ORANGE}"/>` + marque(x2 + 194, y + 270, 17, BLANC, ORANGE, null);
  s += barre(x2 + 30, y + 324, 192, 10, GRIS_CLAIR);

  // La charte graphique : un document de règles
  s += carte(x3, y, w, h);
  s += `<path d="M ${x3} ${y + 22} a 22 22 0 0 1 22 -22 h ${w - 44} a 22 22 0 0 1 22 22 v 50 h ${-w} z" fill="${NUIT}"/>`;
  s += marque(x3 + 40, y + 36, 15, BLEU, BLANC, null) + barre(x3 + 66, y + 30, 92, 12, BLANC);
  s += `<rect x="${x3 + 30}" y="${y + 100}" width="192" height="104" rx="10" fill="none" stroke="${BLEU}" stroke-width="2.5" stroke-dasharray="7 7"/>`;
  s += marque(x3 + 96, y + 152, 24, BLEU, BLANC, null) + barre(x3 + 130, y + 140, 64, 11, NUIT) + barre(x3 + 130, y + 160, 44, 8);
  [NUIT, BLEU, ORANGE].forEach((c, i) => { s += `<rect x="${x3 + 30 + i * 46}" y="${y + 228}" width="36" height="36" rx="8" fill="${c}"/>`; });
  s += barre(x3 + 30, y + 288, 192, 10) + barre(x3 + 30, y + 310, 150, 10) + barre(x3 + 30, y + 332, 172, 10);

  s += texte(x1 + w / 2, y + h + 62, 'Logo', 27);
  s += texte(x2 + w / 2, y + h + 62, 'Identité visuelle', 27);
  s += texte(x3 + w / 2, y + h + 62, 'Charte graphique', 27);
  return svg(s);
}

// ---------------------------------------------------------------- 2. Le brief
function visuelBrief() {
  let s = decor('#fdf3e7', '#fbe8d3', '#f9e1c8');
  const x = 322, y = 78, w = 400, h = 520;

  // Bulle de question, à gauche
  s += `<path d="M 96 250 a 28 28 0 0 1 28 -28 h 124 a 28 28 0 0 1 28 28 v 84 a 28 28 0 0 1 -28 28 h -70 l -34 34 v -34 h -20 a 28 28 0 0 1 -28 -28 z" fill="${BLEU}"/>`;
  s += texte(186, 328, '?', 92, BLANC, 700);

  // La feuille de brief, légèrement inclinée
  s += `<g transform="rotate(-4 ${x + w / 2} ${y + h / 2})">`;
  s += carte(x, y, w, h, 18);
  s += texte(x + 44, y + 84, 'Brief', 50, NUIT, 700, 'start');
  s += barre(x + 44, y + 104, 74, 8, ORANGE);
  const largeurs = [236, 196, 250, 172, 222, 148];
  largeurs.forEach((l, i) => {
    const ly = y + 150 + i * 58;
    if (i < 4) {
      s += `<rect x="${x + 44}" y="${ly}" width="34" height="34" rx="9" fill="${BLEU}"/>`;
      s += `<path d="M ${x + 53} ${ly + 18} l 7 7 l 13 -15" fill="none" stroke="${BLANC}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      s += `<rect x="${x + 46}" y="${ly + 2}" width="30" height="30" rx="8" fill="none" stroke="${GRIS}" stroke-width="3.5"/>`;
    }
    s += barre(x + 98, ly + 5, l, 12, i < 4 ? NUIT : GRIS) + barre(x + 98, ly + 24, l * 0.6, 8, GRIS_CLAIR);
  });
  s += `</g>`;

  // Le crayon
  s += `<g transform="rotate(38 800 400)">
    <rect x="780" y="208" width="40" height="46" rx="10" fill="#f2a9a0"/>
    <rect x="780" y="240" width="40" height="22" fill="${GRIS}"/>
    <rect x="780" y="262" width="40" height="250" fill="${ORANGE}"/>
    <rect x="793" y="262" width="14" height="250" fill="#f08a4b"/>
    <path d="M 780 512 h 40 l -20 62 z" fill="#f4dcc3"/>
    <path d="M 792.5 551 h 15 l -7.5 23 z" fill="${NUIT}"/>
  </g>`;

  // Le résultat : un logo, en bas à gauche
  s += carte(118, 440, 132, 132, 26);
  s += marque(184, 506, 36);
  return svg(s);
}

// ---------------------------------------------------------------- 3. Les formats de fichiers
function fichier(x, y, extension, couleur, damier) {
  const w = 176, h = 232, coin = 46, r = 16;
  let s = `<path d="M ${x + r} ${y + 12} h ${w - coin - r} l ${coin} ${coin} v ${h - coin - r} a ${r} ${r} 0 0 1 ${-r} ${r} h ${-(w - 2 * r)} a ${r} ${r} 0 0 1 ${-r} ${-r} v ${-(h - 2 * r)} a ${r} ${r} 0 0 1 ${r} ${-r} z" fill="${NUIT}" opacity="0.08"/>`;
  s += `<path d="M ${x + r} ${y} h ${w - coin - r} l ${coin} ${coin} v ${h - coin - r} a ${r} ${r} 0 0 1 ${-r} ${r} h ${-(w - 2 * r)} a ${r} ${r} 0 0 1 ${-r} ${-r} v ${-(h - 2 * r)} a ${r} ${r} 0 0 1 ${r} ${-r} z" fill="${BLANC}"/>`;
  s += `<path d="M ${x + w - coin} ${y} v ${coin - 10} a 10 10 0 0 0 10 10 h ${coin - 10} z" fill="${GRIS_CLAIR}"/>`;
  const cx = x + w / 2, cy = y + 104;
  if (damier) {
    // Fond transparent : le damier gris et blanc des logiciels de dessin
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
      if ((i + j) % 2 === 0) s += `<rect x="${cx - 48 + i * 16}" y="${cy - 48 + j * 16}" width="16" height="16" fill="${GRIS_CLAIR}"/>`;
    }
  }
  s += marque(cx, cy, 34, BLEU, BLANC, ORANGE);
  s += `<path d="M ${x} ${y + h - 62} h ${w} v ${62 - r} a ${r} ${r} 0 0 1 ${-r} ${r} h ${-(w - 2 * r)} a ${r} ${r} 0 0 1 ${-r} ${-r} z" fill="${couleur}"/>`;
  s += texte(cx, y + h - 19, extension, 34, BLANC, 700);
  return s;
}

function visuelFormats() {
  let s = decor('#eef2f8', '#e2e9f3', '#dfe7f2');

  // En haut à gauche : une courbe vectorielle et ses points d'ancrage
  s += `<path d="M 118 150 C 200 40, 300 220, 420 96" fill="none" stroke="${BLEU}" stroke-width="5" stroke-linecap="round"/>`;
  s += `<path d="M 118 150 L 176 72 M 420 96 L 350 168" stroke="${NUIT}" stroke-width="2.5"/>`;
  [[118, 150], [420, 96]].forEach(([px, py]) => { s += `<rect x="${px - 9}" y="${py - 9}" width="18" height="18" fill="${BLANC}" stroke="${NUIT}" stroke-width="3.5"/>`; });
  [[176, 72], [350, 168]].forEach(([px, py]) => { s += `<circle cx="${px}" cy="${py}" r="7" fill="${NUIT}"/>`; });

  // En haut à droite : des pixels
  const pixels = ['..XX..', '.XXXX.', 'XXXXXX', 'XXXXXX', '.XXXX.', '..XX..'];
  pixels.forEach((ligne, j) => [...ligne].forEach((c, i) => {
    if (c === 'X') s += `<rect x="${742 + i * 26}" y="${46 + j * 26}" width="23" height="23" rx="3" fill="${(i + j) % 3 === 0 ? ORANGE : BLEU}" opacity="${(i + j) % 2 ? 0.75 : 1}"/>`;
  }));

  s += fichier(92, 262, 'SVG', ORANGE);
  s += fichier(312, 302, 'PNG', BLEU, true);
  s += fichier(532, 262, 'PDF', ROUGE);
  s += fichier(752, 302, 'AI', NUIT);
  return svg(s);
}

// ---------------------------------------------------------------- 4. Travailler à distance
function ordinateur(x, y, contenu) {
  const w = 300, h = 196;
  let s = `<rect x="${x - 26}" y="${y + h + 14}" width="${w + 52}" height="20" rx="10" fill="${NUIT}" opacity="0.08"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${NUIT}"/>`;
  s += `<rect x="${x + 12}" y="${y + 12}" width="${w - 24}" height="${h - 24}" rx="7" fill="${BLANC}"/>`;
  s += contenu;
  s += `<path d="M ${x - 26} ${y + h} h ${w + 52} v 6 a 14 14 0 0 1 -14 14 h ${-(w + 24)} a 14 14 0 0 1 -14 -14 z" fill="#24425f"/>`;
  s += `<rect x="${x + w / 2 - 34}" y="${y + h}" width="68" height="7" rx="3.5" fill="${GRIS}"/>`;
  return s;
}

function horloge(cx, cy, heure) {
  const a = (heure % 12) * 30 * Math.PI / 180;
  return `<circle cx="${cx}" cy="${cy + 6}" r="40" fill="${NUIT}" opacity="0.08"/>
    <circle cx="${cx}" cy="${cy}" r="40" fill="${BLANC}"/>
    <circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="${NUIT}" stroke-width="5"/>
    <path d="M ${cx} ${cy} L ${cx + 19 * Math.sin(a)} ${cy - 19 * Math.cos(a)}" stroke="${NUIT}" stroke-width="6" stroke-linecap="round"/>
    <path d="M ${cx} ${cy} L ${cx} ${cy - 28}" stroke="${ORANGE}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="5" fill="${NUIT}"/>`;
}

function visuelDistance() {
  let s = decor('#e5f3f4', '#d6ecee', '#d2e9ec');
  const y = 300;

  // La liaison entre les deux postes
  s += `<path d="M 232 ${y - 26} C 320 96, 704 96, 792 ${y - 26}" fill="none" stroke="${BLEU}" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 17"/>`;

  // À gauche : le client envoie son brief
  let gauche = barre(110, y + 38, 120, 14, NUIT) + barre(110, y + 66, 196, 10) + barre(110, y + 88, 168, 10) + barre(110, y + 110, 184, 10);
  gauche += `<rect x="110" y="${y + 136}" width="92" height="30" rx="15" fill="${ORANGE}"/>`;
  s += ordinateur(82, y, gauche);

  // À droite : le studio dessine
  let droite = marque(752, y + 86, 44);
  droite += [NUIT, BLEU, ORANGE].map((c, i) => `<circle cx="${850 + i * 0}" cy="${y + 52 + i * 36}" r="13" fill="${c}"/>`).join('');
  droite += barre(676, y + 150, 152, 10);
  s += ordinateur(642, y, droite);

  // Les deux horloges : une heure d'écart
  s += horloge(232, y - 78, 10) + horloge(792, y - 78, 11);

  // Les bulles de discussion, au centre
  s += `<path d="M 428 214 a 20 20 0 0 1 20 -20 h 124 a 20 20 0 0 1 20 20 v 44 a 20 20 0 0 1 -20 20 h -96 l -26 24 v -24 h -2 a 20 20 0 0 1 -20 -20 z" fill="${BLEU}"/>`;
  s += barre(450, 218, 120, 10, BLANC) + barre(450, 240, 84, 10, BLANC);
  s += `<path d="M 596 346 a 20 20 0 0 0 -20 -20 h -112 a 20 20 0 0 0 -20 20 v 40 a 20 20 0 0 0 20 20 h 86 l 26 24 v -24 a 20 20 0 0 0 20 -20 z" fill="${BLANC}"/>`;
  s += barre(466, 350, 108, 10, NUIT) + barre(466, 372, 70, 10, GRIS);

  s += texte(232, y + 290, 'Paris', 27);
  s += texte(792, y + 290, 'Antananarivo', 27);
  return svg(s);
}

// ---------------------------------------------------------------- 5. Les pages d'un site vitrine
function visuelSiteVitrine() {
  let s = decor('#eef5f0', '#e0efe6', '#dcece3');

  // La fenêtre de navigateur : l'accueil du site
  const x = 92, y = 64, w = 560, h = 356;
  s += carte(x, y, w, h, 18);
  s += `<path d="M ${x} ${y + 18} a 18 18 0 0 1 18 -18 h ${w - 36} a 18 18 0 0 1 18 18 v 24 h ${-w} z" fill="${GRIS_CLAIR}"/>`;
  [ORANGE, '#f2c94c', '#6fcf97'].forEach((c, i) => { s += `<circle cx="${x + 24 + i * 20}" cy="${y + 21}" r="6" fill="${c}"/>`; });
  s += `<rect x="${x + 100}" y="${y + 11}" width="${w - 130}" height="20" rx="10" fill="${BLANC}"/>`;
  // En-tête du site : logo et menu
  s += marque(x + 44, y + 76, 15, BLEU, BLANC, null) + barre(x + 66, y + 70, 70, 12, NUIT);
  [52, 40, 64, 48].forEach((l, i) => { s += barre(x + 300 + i * 66, y + 71, l, 10); });
  // Bandeau d'accueil : promesse, bouton, illustration
  s += barre(x + 44, y + 128, 230, 18, NUIT) + barre(x + 44, y + 156, 190, 18, NUIT);
  s += barre(x + 44, y + 192, 250, 10) + barre(x + 44, y + 212, 210, 10);
  s += `<rect x="${x + 44}" y="${y + 240}" width="110" height="34" rx="17" fill="${ORANGE}"/>`;
  s += `<rect x="${x + 340}" y="${y + 116}" width="176" height="170" rx="16" fill="#e3f2f7"/>`;
  s += marque(x + 428, y + 190, 44);
  // Trois cartes de services
  [0, 1, 2].forEach(i => {
    const cx = x + 44 + i * 164;
    s += `<rect x="${cx}" y="${y + 296}" width="144" height="44" rx="10" fill="${GRIS_CLAIR}"/>`;
    s += `<rect x="${cx + 10}" y="${y + 306}" width="24" height="24" rx="7" fill="${BLEU}"/>` + barre(cx + 44, y + 313, 80, 10, GRIS);
  });

  // À droite : le téléphone, même site en version mobile
  s += `<rect x="700" y="${y + 44}" width="150" height="300" rx="22" fill="${NUIT}" opacity="0.08"/>`;
  s += `<rect x="700" y="${y + 32}" width="150" height="300" rx="22" fill="${NUIT}"/>`;
  s += `<rect x="708" y="${y + 40}" width="134" height="284" rx="16" fill="${BLANC}"/>`;
  s += marque(728, y + 66, 10, BLEU, BLANC, null) + barre(744, y + 61, 40, 10, NUIT) + barre(812, y + 61, 20, 10);
  s += barre(722, y + 96, 100, 14, NUIT) + barre(722, y + 118, 76, 14, NUIT) + barre(722, y + 144, 106, 8) + barre(722, y + 160, 90, 8);
  s += `<rect x="722" y="${y + 180}" width="70" height="26" rx="13" fill="${ORANGE}"/>`;
  [0, 1, 2].forEach(i => { s += `<rect x="722" y="${y + 222 + i * 32}" width="106" height="24" rx="8" fill="${GRIS_CLAIR}"/>`; });

  // En bas : les sept pages, comme un plan du site
  const pages = ['Accueil', 'Services', 'Réalisations', 'À propos', 'Contact', 'Blog', 'Mentions'];
  const pw = 112, gap = 18, x0 = (W - (7 * pw + 6 * gap)) / 2, py = 486;
  s += `<path d="M ${x0 + pw / 2} ${py - 22} H ${x0 + 6 * (pw + gap) + pw / 2}" stroke="${BLEU}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>`;
  pages.forEach((nom, i) => {
    const px = x0 + i * (pw + gap);
    s += `<path d="M ${px + pw / 2} ${py - 22} V ${py}" stroke="${BLEU}" stroke-width="3"/>`;
    s += carte(px, py, pw, 118, 12);
    s += `<rect x="${px}" y="${py}" width="${pw}" height="14" rx="6" fill="${i === 0 ? ORANGE : BLEU}"/>`;
    s += barre(px + 14, py + 30, 60, 8, NUIT) + barre(px + 14, py + 46, 84, 6) + barre(px + 14, py + 58, 70, 6) + barre(px + 14, py + 70, 78, 6);
    s += texte(px + pw / 2, py + 104, nom, 15, NUIT, 700);
  });
  return svg(s);
}

const VISUELS = {
  'logo-identite-visuelle-charte-graphique-differences': visuelDifferences,
  'brief-creation-logo': visuelBrief,
  'formats-fichiers-logo': visuelFormats,
  'travailler-avec-graphiste-freelance-a-distance': visuelDistance,
  'pages-indispensables-site-vitrine': visuelSiteVitrine,
};

(async () => {
  fs.mkdirSync(SORTIE, { recursive: true });
  for (const [nom, dessiner] of Object.entries(VISUELS)) {
    // Rendu deux fois plus grand puis réduit, pour des contours nets
    const image = await sharp(Buffer.from(dessiner()), { density: 144 }).resize(W, H).png().toBuffer();
    await sharp(image).webp({ quality: 86 }).toFile(path.join(SORTIE, nom + '.webp'));
    await sharp(image).flatten({ background: BLANC }).jpeg({ quality: 86 }).toFile(path.join(SORTIE, nom + '.jpg'));
    console.log(nom, Math.round(fs.statSync(path.join(SORTIE, nom + '.webp')).size / 1024) + ' Ko (webp)');
  }
})();
