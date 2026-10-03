# Historique du projet Gas'in Sary

Document de passation entre sessions et entre assistants IA.
Règles et organisation du projet : voir [AGENTS.md](AGENTS.md).
**À mettre à jour à la fin de chaque session.**

Dernière mise à jour : 03/10/2026

## État actuel

- **En production** (<https://gasinsary.github.io/>) : l'ancien site, en HTML écrit à la main (branche `main`, dernier commit `699624a`).
- **Sur la version de test** (<https://gasinsary.github.io/staging-t4sj762s/>) : le site converti à Jekyll + la connexion Supabase (branche locale `staging`).
- **En attente** : la validation de la version de test par le propriétaire, avant mise en production.
- Attention : la branche `staging` n'existe que sur le dépôt de test et en local. Elle n'a pas été poussée sur le dépôt de production.

## En cours

- **Pas de mise en production pour l'instant** (décision du propriétaire, 03/10/2026) : le site est d'abord mis à jour sur la version de test.
- **Corrections de l'audit** : le propriétaire a validé l'ordre de traitement proposé à la fin de [AUDIT.md](AUDIT.md). Étapes 1 (contact), 2 (défauts mobiles), 3 (titres `<h1>`, textes, positionnement) et 4 (poids des pages) faites sur la version de test ; prochaine étape : 5 (contenu : ajouter des projets, dont des sites web, avec des titres précis). Elle dépend du propriétaire, qui doit fournir les projets.
- **Formulaire de contact** : le propriétaire doit faire un envoi réel depuis la version de test pour confirmer que le message arrive et que la confirmation s'affiche.
- **À faire valider par le propriétaire** : la relecture des textes réécrits, et le titre « Fondateur & directeur artistique » (proposé, appliqué, pas confirmé explicitement).

## Portfolio : projets concept pour l'agence Digital Prod (en cours)

- **Contexte** : le 02/10/2026, le propriétaire a reçu un e-mail de milan@digitalprod.com (Digital Prod, agence parisienne de production de contenus digitaux) lui demandant sa disponibilité en freelance, son tarif journalier et un portfolio récent. L'agence est réelle (SIREN 511 233 595, domaine officiel `digitalprod.com`) ; l'appartenance de l'expéditeur à l'agence n'a pas pu être confirmée publiquement.
- **Contrainte** : les vrais projets du propriétaire n'ont pas l'accord des clients pour être publiés. Décision : deux **projets concept** (marques fictives, annoncés comme tels), ciblés sur ce que l'agence produit (réseaux sociaux, bannières, e-mailing pour des marques de beauté et de grande consommation).
- **Fait** : briefs dans `briefs/`, fiches `_projets/campagne-reseaux-sociaux-voara.md` et `_projets/campagne-publicitaire-bao-fizz.md` en brouillon, avec des images provisoires dans `portfolio/<nom>/img/`.
- **Voara** : direction artistique « luxe calme » dans `briefs/voara-direction-artistique.html`. À la demande du propriétaire, les huit visuels et les cinq planches ont été **générés par l'assistant** (script `briefs/outils/generer-visuels-voara.py`, Pillow) : flacon dessiné, aucune photographie. Visuels en taille réelle dans `briefs/voara-visuels/`, planches du site dans `portfolio/campagne-reseaux-sociaux-voara/img/`. La fiche reste en brouillon : le propriétaire doit valider, et idéalement refaire les visuels avec ses outils (la fiche annonce Photoshop et Illustrator, ce qui n'est pas vrai des images générées).
- **Bao Fizz** : visuels à créer par le propriétaire en suivant le brief ; images provisoires en place.
- **À faire ensuite** : relire les textes des deux pages par rapport aux visuels réels, retirer `brouillon` et `sitemap: false`, éventuellement passer `accueil: true`, puis rédiger la réponse à l'agence (tarif journalier à fixer avec le propriétaire).
- **Questions sans réponse** : le projet Aquafish est-il un vrai client ? (s'il est fictif : `concept: true` et retirer le témoignage) ; faut-il mettre la nouvelle version en production avant de répondre à l'agence ?
- Les noms Voara et Bao Fizz n'ont fait l'objet que d'une recherche web rapide, pas d'une recherche de marque déposée.

## Version de test en ligne (staging)

But : voir le site en ligne avant de le mettre en production. Marche à suivre : voir « Publication » dans AGENTS.md.

- Dépôt public `gasinsary/staging-t4sj762s`, créé le 03/10/2026. Adresse du site de test : <https://gasinsary.github.io/staging-t4sj762s/>.
- En service depuis le 03/10/2026 : GitHub Pages activé (branche `main`, dossier racine). Le vrai Jekyll de GitHub génère le site sans erreur.
- Accès en écriture depuis la machine du propriétaire : clé SSH dédiée (clé de déploiement du dépôt de test), alias `github-gis-staging` dans `~/.ssh/config`. L'alias `github-gis` (production) est une clé de déploiement qui ne donne accès qu'au dépôt de production.
- Le dépôt est public parce que GitHub Pages ne publie pas un dépôt privé avec le plan gratuit. Le nom contient un suffixe aléatoire pour que l'adresse ne soit pas devinable, et le site de test porte une balise `noindex`. Limite : le dépôt reste visible sur le profil GitHub `gasinsary`.

## À faire ensuite

1. Après accord du propriétaire : fusionner `staging` dans `main` et pousser sur `origin` (mise en production de la conversion Jekyll).
2. Formulaire de contact : enregistrer les messages dans Supabase (table avec insertion publique seule, lecture réservée). Aujourd'hui il envoie à formsubmit.co.
3. Ajouter les nouveaux projets du portfolio (le propriétaire veut mettre le portfolio à jour : c'est l'objectif de départ).

## Problèmes connus, non traités

Liste complète et ordre de traitement proposé : voir [AUDIT.md](AUDIT.md). Rappel des principaux :

- Le formulaire de contact affiche probablement une erreur même quand l'envoi réussit : `assets/vendor/php-email-form/validate.js` attend la réponse `OK`, que formsubmit.co ne renvoie pas. Non testé.
- L'accueil et la page portfolio n'ont pas de titre `<h1>` (les titres principaux sont des `<h2>`). À corriger pour le SEO, avec un ajustement CSS (`.hero .content h2`).
- La section témoignages de l'accueil est désactivée (commentaire HTML) et ne contient que du texte de remplissage.
- Fichiers conservés mais plus utilisés par les pages : `assets/img/portfolio/portfolio-2.jpg`, les anciens JPG et PNG remplacés par des WebP (sauf `aquafish.jpg` et `preview.jpg`, qui servent d'images de partage), `assets/img/logo.svg`, `assets/vendor/php-email-form/validate.js`. Ils peuvent être supprimés avec l'accord du propriétaire.
- Pistes de poids restantes : les icônes Bootstrap (230 Ko pour une vingtaine d'icônes utilisées), les graisses de polices Google demandées en trop, Supabase chargé sur l'accueil sans être encore utilisé.
- Fautes de frappe dans les textes d'origine, conservées telles quelles (« échatillon », « Acceuil », « Visuelle »...).
- Le défilement vers les sections depuis une autre page (ex. `/#contact`) n'a pas pu être vérifié visuellement.

## Décisions prises

| Décision | Raison |
|---|---|
| Garder les adresses en dossiers (`/portfolio/<nom>/`) | Bon pour le SEO, adresses déjà connues de Google |
| Passer à Jekyll | Un seul modèle pour l'en-tête et le pied de page, un fichier par projet, balises SEO propres à chaque page, sitemap automatique. Le résultat publié reste du HTML pur |
| Ne pas charger le portfolio depuis Supabase | Le contenu serait absent du HTML : mauvais pour le SEO et pas d'aperçu sur les réseaux sociaux |
| Ne pas installer Ruby/Jekyll en local | Refus du propriétaire ; la validation passe par la version de test en ligne |
| Positionnement « studio créatif », « nous » pour l'offre, « je » pour le fondateur | Mirado travaille avec sa femme (marketing) et, selon les projets, un graphiste et un développeur indépendants. « Agence en expansion » était faux et « freelance seul » aussi. Détail dans AGENTS.md |
| Supabase chargé seulement sur l'accueil | Inutile ailleurs pour l'instant (`supabase: true` dans l'en-tête de la page) |

## Journal

### 03/10/2026 (assistant : Claude)

**Supabase**
- Site relié au projet Supabase `gjiqxswjczvbgkepicjw` : nouveau fichier `assets/js/supabase.js` (client disponible sous `window.supabaseClient`), bibliothèque `supabase-js@2` chargée depuis jsDelivr. Connexion testée depuis le site local : la clé est acceptée.
- Fichier local `.mcp.json` (non versionné) pour que Claude Code accède à ce projet Supabase.

**Conversion à Jekyll** (accueil, portfolio, page Aquafish)
- Créés : `_config.yml`, `_layouts/`, `_includes/`, `_projets/identite-visuelle-aquafish-by-gasinsary.md`, `_data/visuels.yml`, `_data/categories.yml`.
- `index.html` et `portfolio/index.html` : il ne reste que le contenu, avec un en-tête YAML.
- Supprimé : `portfolio/identite-visuelle-aquafish-by-gasinsary/index.html` (la page est maintenant générée depuis `_projets/` ; ses images restent dans `img/`).
- SEO : titre, description, adresse canonique et image de partage propres à chaque page. Avant, les pages portfolio déclaraient l'accueil comme adresse canonique, ce qui les empêchait d'être indexées.
- `README.md` : mode d'emploi pour ajouter un projet ou un visuel.

**Différences visibles par rapport à l'ancien site**
- Accueil : la carte « Identité visuelle » montre le visuel Aquafish et mène à la page du projet (avant : image `portfolio-2.jpg` en grand).
- Pages portfolio : les liens du menu « A propos », « Services », « Contact » ramènent à l'accueil (avant : liens morts).
- Page Aquafish : le bouton « Contactez maintenant » mène au formulaire ; outils affichés « Illustrator, Photoshop, After Effects ».
- Identifiant `id="services"` en double supprimé sur l'accueil.
- Le dossier `forms/` (PHP inutilisable sur GitHub Pages) n'est plus publié.

**Préparation de la version de test**
- `baseurl` retiré de `_config.yml`, lien de retour du formulaire rendu dynamique, balise `noindex` automatique sous un sous-dossier.
- Vérifié sur le rendu de test local avec le sous-dossier `/test` : tous les liens internes sont bien préfixés.

**Documents de passation**
- Créés : `AGENTS.md`, `CLAUDE.md` (renvoie à AGENTS.md), `HISTORIQUE.md`.

**Mise en service de la version de test**
- Dépôt `gasinsary/staging-t4sj762s` créé, clé de déploiement dédiée ajoutée, branche `staging` poussée, GitHub Pages activé.
- Vérifié en ligne : les trois pages répondent, le HTML généré par le vrai Jekyll est identique au rendu de test local, aucun lien interne cassé, aucun lien ne sort du sous-dossier de test, aucune erreur dans la console, balise `noindex` présente.
- `sitemap.xml` généré (accueil, portfolio, page Aquafish, `mpatk.html`) ; le fichier de vérification Google en est bien exclu. Les fichiers de documentation, `forms/` et `_config.yml` ne sont pas publiés.

**Mises à jour du contenu et audit**
- Année du copyright automatique : calculée par Jekyll (`site.time`) dans `_includes/footer.html`, puis mise à jour à chaque visite par `assets/js/main.js` (classe `annee-courante`).
- Audit complet (erreurs visiteur, SEO, expérience prospect, affichage mobile/tablette/ordinateur, accessibilité) : résultats dans `AUDIT.md`. Aucune correction de l'audit n'a encore été appliquée.
- Le formulaire de contact n'a volontairement pas été envoyé pendant l'audit (cela expédie un e-mail au propriétaire).

**Corrections de l'audit, étapes 1 et 2**
- Coordonnées centralisées dans `_config.yml` (`email`, `telephone`, `date_naissance`). Le numéro WhatsApp est le même que le téléphone (choix du propriétaire).
- Âge automatique : calculé par Jekyll dans `index.html`, puis mis à jour à chaque visite par `main.js` (attribut `data-naissance`).
- Téléphone, e-mail et WhatsApp cliquables (section contact et fiche « À propos ») ; bouton WhatsApp sur la page projet.
- Formulaire : `assets/vendor/php-email-form/validate.js` n'est plus chargé. L'envoi est fait par `main.js` vers l'adresse AJAX de formsubmit.co (`data-ajax`), avec messages en français. Sans JavaScript, le formulaire s'envoie vers son `action` comme avant.
- Mobile : fiche « À propos » réorganisée (téléphone et e-mail sur toute la largeur), marges latérales sur le titre de la page projet, icônes sociales masquées quand le menu est ouvert.
- Styles ajoutés à la fin de `assets/css/main.css`, sous le titre « Ajustements Gas'in Sary ».

**Corrections de l'audit, étape 3**
- Titres `<h1>` : accroche de l'accueil et titre de la page portfolio (styles `h1` ajoutés à côté des `h2` dans `main.css`).
- Textes réécrits selon le positionnement décidé (voir « Ton et positionnement » dans AGENTS.md) : accroche, « À propos », parcours, services (applications ajoutées), contact, descriptions SEO.
- Menu : « Resume » devient « Parcours » (l'ancre `#resume` est conservée). Pied de page et libellés traduits en français.
- Fautes corrigées dans les pages, `_data/visuels.yml` et la fiche Aquafish.
- Fiche « À propos » : la fonction passe sur toute la largeur sur mobile ; les quatre blocs de compétences ont la même hauteur.
- Informations données par le propriétaire : clients internationaux réels (dont HEXOA et des particuliers), partenaires indépendants sur certains projets seulement. Le nom HEXOA n'est pas publié sur le site.

**Corrections de l'audit, étape 4 (poids des pages)**
- Logo de l'en-tête : `assets/img/logo-header.webp` (393 × 144 px, 15 Ko), rendu à partir de `logo.svg`.
- Photo, illustration d'accueil, visuels du portfolio et galerie Aquafish convertis en WebP (qualité 80, mêmes dimensions). Images de l'accueil : environ 2,1 Mo → 0,2 Mo.
- `width` et `height` sur toutes les images, `loading="lazy"` sous la ligne de flottaison, `fetchpriority="high"` sur l'illustration d'accueil.
- Swiper (CSS et JS) chargé seulement quand `swiper: true` ; champ `image_partage` pour garder un JPG en image de partage.
- Bloc de faux témoignages du modèle retiré de `index.html` (récupérable dans l'historique git, commit `e256df4`).
- Outils utilisés pour la conversion (hors dépôt) : Pillow pour les WebP, sharp pour le rendu du logo.

**Projets concept (étape 5 de l'audit, en cours)**
- Briefs `briefs/01-voara-campagne-reseaux-sociaux.md` et `briefs/02-bao-fizz-campagne-publicitaire.md`.
- Deux fiches projet en brouillon, catégorie « Campagne digitale » ajoutée, images provisoires générées.
- Modèles : champs `concept` et `brouillon` (carte, page projet, balise `noindex`, filtres du portfolio masqués quand aucune réalisation visible ne les utilise).

**Voara : direction artistique et visuels**
- Planche de direction artistique (HTML) et brief alignés sur une direction « luxe calme » (noir végétal, ivoire, or champagne, Cormorant Garamond et Jost).
- Huit visuels (3 posts, 1 story, 4 vues de carrousel) et cinq planches 1024 × 683 générés par script, à la place des images provisoires.
