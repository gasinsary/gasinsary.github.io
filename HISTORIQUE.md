# Historique du projet Gas'in Sary

Document de passation entre sessions et entre assistants IA.
Règles et organisation du projet : voir [AGENTS.md](AGENTS.md).
**À mettre à jour à la fin de chaque session.**

Dernière mise à jour : 05/10/2026

## État actuel

- **En production depuis le 04/10/2026** (<https://gasinsary.github.io/>) : le site Jekyll complet (accueil réorienté vers les clients étrangers, portfolio avec les projets concept Voara et Bao Fizz, connexion Supabase). Mise en production demandée explicitement par le propriétaire. La branche `main` du dépôt de production et la branche `staging` pointent sur le même commit.
- **Version de test** (<https://gasinsary.github.io/staging-t4sj762s/>) : identique à la production à cette date. Elle reste l'endroit où vérifier tout changement avant de le publier.
- Avant cette date, la production affichait l'ancien site en HTML écrit à la main (commit `699624a`).

## En cours

- **Formulaire de contact** : fonctionne. Le propriétaire a reçu le 07/10/2026 un premier message envoyé depuis le formulaire du site (plus un e-mail direct). Jamais testé par l'assistant lui-même.
- **Visibilité au 07/10/2026** (vérifiée dans Google et Bing depuis le navigateur) : Google a indexé cinq pages du nouveau site (accueil avec le nouveau titre, blog, portfolio, Voara, Bao Fizz) ; pas encore la page agences, la page logo, Aquafish ni les articles. Bing n'a encore que l'ancienne copie de l'accueil. Sur « graphiste freelance Madagascar » et « externaliser création graphique Madagascar », le site n'est pas dans les dix premiers résultats, ni sur Google ni sur Bing. Sur le nom du studio, Bing place la page Facebook avant le site, et le profil LinkedIn de Mirado affiche encore « CEO ».
- Les affirmations de l'accueil (visio, devis « au projet ou à la journée », disponibilité pendant les heures de bureau européennes, « Français, anglais », titre « Fondateur & directeur artistique ») ont été **confirmées par le propriétaire** le 04/10/2026.
- **Réponse à l'agence Digital Prod** : rédigée le 06/10/2026 (en anglais, comme l'e-mail reçu) et remise au propriétaire pour envoi. Tarif journalier fixé par lui : 50 € par jour. Précision demandée par lui : travail en français, échanges écrits en anglais possibles, visios en français seulement.
- **Google Search Console** : le compte Google utilisé par le propriétaire le 04/10/2026 n'avait pas encore le site. Fichier de validation `google17eaf983518ef390.html` ajouté à la racine et publié. **Propriété validée et `sitemap.xml` déclaré par le propriétaire le 04/10/2026** (« Sitemap submitted successfully »). À surveiller dans les jours suivants : le nombre de pages découvertes et indexées.
- **Audit** : étapes 1 à 4 faites, étape 5 (contenu) en partie avec les deux projets concept. Restent : page 404, contraste et accessibilité, refonte de « À propos » et des barres de compétences, une page par service.

## Portfolio : projets concept pour l'agence Digital Prod (publiés)

- **Contexte** : le 02/10/2026, le propriétaire a reçu un e-mail de milan@digitalprod.com (Digital Prod, agence parisienne de production de contenus digitaux) lui demandant sa disponibilité en freelance, son tarif journalier et un portfolio récent. L'agence est réelle (SIREN 511 233 595, domaine officiel `digitalprod.com`) ; l'appartenance de l'expéditeur à l'agence n'a pas pu être confirmée publiquement.
- **Contrainte** : les vrais projets du propriétaire n'ont pas l'accord des clients pour être publiés. Décision : deux **projets concept** (marques fictives, annoncés comme tels), ciblés sur ce que l'agence produit (réseaux sociaux, bannières, e-mailing pour des marques de beauté et de grande consommation).
- **Fait** : briefs dans `briefs/`, fiches `_projets/campagne-reseaux-sociaux-voara.md` et `_projets/campagne-publicitaire-bao-fizz.md` en brouillon, avec des images provisoires dans `portfolio/<nom>/img/`.
- **Voara** : direction artistique « luxe calme » dans `briefs/voara-direction-artistique.html`. À la demande du propriétaire, les huit visuels et les cinq planches ont été **générés par l'assistant** (script `briefs/outils/generer-visuels-voara.py`, Pillow) : flacon dessiné, aucune photographie. Visuels en taille réelle dans `briefs/voara-visuels/`, planches du site dans `portfolio/campagne-reseaux-sociaux-voara/img/`. La fiche reste en brouillon : le propriétaire doit valider, et idéalement refaire les visuels avec ses outils (la fiche annonce Photoshop et Illustrator, ce qui n'est pas vrai des images générées).
- **Voara, suite** : le 03/10/2026 au soir, le propriétaire a remplacé la couverture et les quatre planches par ses propres versions retravaillées (flacon et fruit de baobab photoréalistes, emblème végétal ajouté au logo). Les fichiers de `briefs/voara-visuels/` et le script correspondent donc à l'ancienne version générée, plus à ce qui est en ligne. Le propriétaire a ensuite validé : outils Photoshop et Illustrator, `brouillon` retiré, projet affiché sur l'accueil (`accueil: true`), planche 4 remplacée par une version au logo harmonisé. **Le projet Voara est terminé et sera publié à la prochaine mise en production.**
- **Bao Fizz** (04/10/2026) : direction artistique dans `briefs/bao-fizz-direction-artistique.html`. Les six formats (visuel principal, newsletter, quatre bannières) et les cinq planches ont été **générés par l'assistant** (script `briefs/outils/generer-visuels-bao-fizz.py`, Pillow) : canette et formes dessinées, aucune photographie. Fichiers dans `briefs/bao-fizz-visuels/` et `portfolio/campagne-publicitaire-bao-fizz/img/`. La fiche reste en **brouillon** tant que le propriétaire n'a pas validé ou remplacé les images, comme il l'a fait pour Voara.
- **Bao Fizz, suite** (04/10/2026) : le propriétaire a remplacé la couverture et les quatre planches par ses versions (canettes et fruits photoréalistes, nouveau logo à feuilles) et en a ajouté deux : `planche-5` (direction artistique) et `planche-6` (posts Instagram). `brouillon` retiré : **le projet Bao Fizz est terminé et sera publié à la prochaine mise en production.** Il n'est pas affiché sur l'accueil (non demandé). `planche-6` a été fournie en 3000 × 3000 px : l'original est conservé dans `briefs/bao-fizz-visuels/originaux/`, la version du site est ramenée à 1024 × 683 px sur le même fond jaune. Le dossier `briefs/bao-fizz-visuels/` (hors `originaux/`), la planche HTML de direction artistique et le script décrivent l'ancienne version générée, plus ce qui est en ligne.
- **Bao Fizz, version finale** (04/10/2026) : le propriétaire a encore modifié `planche-2` et supprimé `planche-3` et `planche-4` (bannières et newsletter en situation). La galerie compte quatre images : logo, direction artistique, bannières, posts Instagram. La fiche ne mentionne plus de newsletter.
- Aquafish : projet fictif, traité le 05/10/2026 (voir le journal).
- Les noms Voara et Bao Fizz n'ont fait l'objet que d'une recherche web rapide, pas d'une recherche de marque déposée.

## Version de test en ligne (staging)

But : voir le site en ligne avant de le mettre en production. Marche à suivre : voir « Publication » dans AGENTS.md.

- Dépôt public `gasinsary/staging-t4sj762s`, créé le 03/10/2026. Adresse du site de test : <https://gasinsary.github.io/staging-t4sj762s/>.
- En service depuis le 03/10/2026 : GitHub Pages activé (branche `main`, dossier racine). Le vrai Jekyll de GitHub génère le site sans erreur.
- Accès en écriture depuis la machine du propriétaire : clé SSH dédiée (clé de déploiement du dépôt de test), alias `github-gis-staging` dans `~/.ssh/config`. L'alias `github-gis` (production) est une clé de déploiement qui ne donne accès qu'au dépôt de production ; elle a l'accès en écriture depuis le 04/10/2026.
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
| Cible : clients étrangers (entreprises et agences), site en français uniquement | Décision du propriétaire le 04/10/2026. Madagascar devient un argument de travail à distance ; « freelance » revient dans le titre Google et le discours aux agences. Détail dans AGENTS.md |
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

**Voara : planches du propriétaire**
- Les cinq images de `portfolio/campagne-reseaux-sociaux-voara/img/` sont désormais celles du propriétaire (WebP, 1024 × 683 px, vérifiées). Envoyées sur la version de test.

**Voara publié dans le portfolio**
- `brouillon` et `sitemap: false` retirés de la fiche ; `accueil: true` ajouté.
- Accueil : pour garder quatre cartes, `accueil` a été retiré du visuel « Photo de couverture Facebook » de `_data/visuels.yml` (il reste dans la page portfolio).

**Référencement des pages projet**
- Modèle `projet.html` : données structurées JSON-LD (fil d'Ariane + réalisation), étapes en `h4` sous « Déroulé », libellés de la fiche sortis des titres, texte alternatif par image de galerie, champ `appel`.
- Fiche Voara : titre et description centrés sur le service (visuels Instagram) et le lieu, textes alternatifs descriptifs, image de partage en JPG (`couverture.jpg`), appel à l'action propre au projet.
- À faire de même pour Aquafish (textes alternatifs de la galerie) et, plus tard, pour Bao Fizz.

### 04/10/2026 (assistant : Claude)

**Accueil réorienté vers les clients étrangers**
- Accroche : « Logos et sites web : votre studio créatif à distance » ; bouton « Demander un devis ».
- Titre Google : « Graphiste et développeur web freelance à Madagascar | Gas'in Sary » ; description et balises de partage réécrites (aussi dans `_config.yml`).
- Nouvelle section `#distance` « Travailler avec nous à distance » (entreprises, agences, langues, décalage horaire, outils, devis), placée après les services.
- Services réordonnés (logo et site d'abord), compétences rédigées en phrases, parcours allégé (répétitions de « passion », « sans diplôme formel »), fiche « À propos » : « Langues » à la place de « Nationalité », nom écrit « Mirado R. » partout.
- Données structurées `ProfessionalService` à la fin de `index.html`.
- **À faire confirmer par le propriétaire** (affirmations écrites sans confirmation explicite) : échanges possibles en visio, devis « au projet ou à la journée », disponibilité pendant les heures de bureau européennes, « Français, anglais » dans la fiche.

**Bao Fizz : direction artistique et visuels**
- Planche de direction artistique (HTML), six formats et cinq planches 1024 × 683 générés par script, à la place des images provisoires.
- Fiche : titre et description centrés sur le service (bannières, newsletter), textes alternatifs, image de partage JPG, appel à l'action tourné vers les marques et les agences. Toujours en brouillon.

**Bao Fizz publié dans le portfolio**
- Images du propriétaire vérifiées (WebP, 1024 × 683 px), deux planches ajoutées à la galerie, `planche-6` mise au format.
- Fiche alignée sur les nouvelles images : textes alternatifs, livrables, étapes, résultat ; image de partage `couverture.jpg` recréée à partir de la nouvelle couverture (le propriétaire avait supprimé l'ancienne).

**Mise en production**
- Bao Fizz : galerie ramenée à quatre images, mentions de la newsletter retirées de la fiche.
- `staging` fusionnée dans `main` (avance rapide) et poussée sur `origin` à la demande du propriétaire, après que celui-ci a donné l'accès en écriture à la clé de déploiement du dépôt de production.

**Accueil : Bao Fizz à la place des logos**
- À la demande du propriétaire : `accueil: true` sur la fiche Bao Fizz, retiré de « Échantillon de logos » dans `_data/visuels.yml` (qui reste dans la page portfolio). L'accueil affiche Voara, Bao Fizz, Aquafish et une illustration.

**Google Search Console**
- Le propriétaire avait aussi envoyé le fichier de validation directement sur GitHub (« Add files via upload », commit `a27e8b5`) : fusionné avec le travail local (commit `76665bf`). Rappel : ne pas modifier le dépôt en ligne à la main, déposer les fichiers dans le dossier local.
- Fichier de validation exclu du sitemap. Propriété validée, sitemap déclaré.

### 05/10/2026 (assistant : Claude)

**Stratégie de mots-clés**
- Recherche des concurrents sur cinq requêtes types. Conclusion : viser les requêtes « service + Madagascar + externalisation / sous-traitance / freelance », avec une page dédiée par sujet. Les concurrents (agences offshore de Madagascar) gagnent avec des pages ou des articles dédiés ; « graphiste freelance Madagascar » est tenu par des annuaires (MadaAllStar, Mission Madagascar, Graphistes Online), où le propriétaire devrait créer un profil.
- Plan validé avec le propriétaire : 1) page pour les agences, 2) page « création de logo et d'identité visuelle », 3) blog (un article par mois, relu et enrichi par le propriétaire, jamais de production en série), 4) page « création de site web » quand un site pourra être montré.
- Images : toutes les images chargées par les pages sont en WebP, avec dimensions et texte alternatif. Pistes non traitées : variantes réduites pour mobile (`srcset`), textes alternatifs de la galerie Aquafish, suppression de 33 anciens fichiers image non utilisés (garder `assets/img/logo.png`, cité dans les données structurées).

**Page pour les agences**
- Nouvelle page `/externalisation-creation-graphique-madagascar/` : prestations, raisons de travailler avec un studio à Madagascar (avec ses limites, dites clairement), déroulement, exemples (projets concept), questions fréquentes, appel à l'action. Données structurées `Service` et fil d'Ariane.
- Lien « Agences » ajouté au menu, lien depuis le bloc « Vous êtes une agence » de l'accueil.
- Le propriétaire a confirmé le 05/10/2026 : travail en marque blanche, livraison des fichiers sources Photoshop et Illustrator, mise en page pour l'impression. **Page mise en production le 05/10/2026** à sa demande.
- Prochaine page prévue : « création de logo et d'identité visuelle », sur le même modèle.

**Page « logo et identité visuelle »**
- Nouvelle page `/creation-logo-identite-visuelle/` : contenu d'une identité, logo seul ou identité complète, déroulement, exemples (Aquafish, échantillon de logos, planches d'identité de Bao Fizz et Voara), questions fréquentes. Données structurées `Service` et fil d'Ariane. Pas de lien dans le menu (déjà sept entrées) : liens depuis la carte « Identité visuelle & logo » de l'accueil et depuis la page pour les agences.
- Le propriétaire a confirmé le 05/10/2026 la planche d'ambiance en début de projet et la présentation de plusieurs pistes de logo.
- **Aquafish est un projet fictif** (réponse du propriétaire, 05/10/2026). Sa fiche porte désormais `concept: true`, le faux témoignage « Sarah Wilson » est supprimé, et les textes qui décrivaient un vrai client (prise de contact, échanges avec les fondateurs, résultats obtenus) sont réécrits. Le site n'affiche plus aucun témoignage. Les trois projets détaillés du portfolio sont donc tous des projets concept.
- Page logo : les quatre exemples utilisent la même carte (`carte-portfolio.html` accepte maintenant des paramètres `image`, `alt`, `titre`, `resume`, `categorie` pour montrer un projet sous un autre angle).
- Dates des projets concept, fixées par le propriétaire le 05/10/2026 : Aquafish « Octobre 2023 », Bao Fizz « Janvier 2024 », Voara « Juin 2024 » (les visuels de Bao Fizz et de Voara ont été produits en octobre 2026).
- **Mention de confidentialité**, demandée par le propriétaire : « Par respect de la confidentialité de nos clients, certaines de nos réalisations ne sont pas publiées. » Elle figure dans l'introduction du portfolio (accueil et page portfolio), sous l'introduction de chaque projet concept (`_layouts/projet.html`) et dans la section d'exemples des deux pages de service.
- **Accès à la page logo** : le menu « Services » devient un sous-menu (« Tous nos services », « Logo et identité visuelle ») ; y ajouter les prochaines pages de service. Sur l'accueil, la carte « Identité visuelle & logo » porte un lien visible « Découvrir ce service ».
- **Mis en production le 05/10/2026**, à la demande explicite du propriétaire : page logo, Aquafish en projet concept sans témoignage, dates, mention de confidentialité, sous-menu « Services ». Contrôlé en ligne sur les sept pages (adresse canonique, un seul titre principal, pas de `noindex`, aucun lien interne cassé, page logo présente dans `sitemap.xml`). Prochaine étape convenue : le blog (un article par mois), puis une page « création de site web ».

**Blog**
- Demande du propriétaire (05/10/2026) : un blog « comme tous les blogs », avec des cartes et des sujets similaires, trois ou quatre articles de départ à des dates différentes, illustrés par l'assistant. Ensuite, **le propriétaire écrira lui-même un article toutes les une à deux semaines et l'enverra pour mise en ligne**.
- Créés : `blog/index.html` (le plus récent en grand, les autres en cartes), `_layouts/article.html` (image, texte, encart de contact, colonne « Articles récents » et « Nos services », section « À lire aussi », données structurées `BlogPosting` et fil d'Ariane), `_includes/carte-article.html`, `_includes/date-fr.html`, réglages des articles dans `_config.yml`, styles à la fin de `assets/css/main.css`.
- Quatre articles dans `_posts/` : différences entre logo, identité visuelle et charte graphique (25/08/2026) ; brief de création de logo (08/09/2026) ; formats de fichiers d'un logo (22/09/2026) ; travailler avec un graphiste freelance à distance (02/10/2026). Ces dates sont antérieures à leur rédaction réelle (05/10/2026) : c'est un choix du propriétaire.
- Illustrations de couverture dessinées par l'assistant (`briefs/outils/generer-visuels-blog.js`, images dans `assets/img/blog/`). Le propriétaire peut les remplacer par les siennes, comme pour Voara et Bao Fizz.
- Liens vers le blog : entrée « Blog » dans le menu (huit entrées, vérifié sur ordinateur), section « Derniers articles du blog » sur l'accueil avant le contact.
- Non fait, à prévoir quand il y aura plus d'articles : filtres par rubrique sur la page du blog, pagination, flux RSS.
- 07/10/2026 : cinquième article, « Site vitrine : les 7 pages indispensables » (rubrique « Création de site web » ; daté du 11/08/2026 à la demande du propriétaire, avant le premier article, bien que rédigé le 07/10/2026), demandé par le propriétaire pour préparer la page de service web, avec consigne de **toujours viser le meilleur référencement** (expression « site vitrine » dans le titre, l'adresse, le titre principal et la description). Il y est écrit que les mentions légales sont indispensables : **le site n'en a pas encore**, à créer (voir « À faire »).

- 07/10/2026 : sixième article, « L'IA va-t-elle remplacer les graphistes ? Non, et voici pourquoi » (rubrique « Conseils »), daté du 28/07/2026 à la demande du propriétaire (avant l'article du 11/08), ton volontairement plus tranché pour être partagé. **Mis en production le 07/10/2026** à la demande explicite du propriétaire. La phrase indiquant que les illustrations du blog ont été produites avec l'aide d'outils d'IA a été **retirée à la demande du propriétaire** (07/10/2026) ; l'article ne dit rien sur l'origine de ses illustrations. Illustration refaite à sa demande : un graphiste qui réfléchit devant son ordinateur face à un robot.

**Page « création de site web » et projet VoolApp (à faire, en attente du propriétaire)**
- Le propriétaire veut une page de service « création de site web » et ajouter au portfolio son propre produit **VoolApp** (<https://voolapp-next.vercel.app/>, application Next.js/React de gestion commerciale, dont il a créé l'identité, le logo et la plateforme). Constat du 07/10/2026 : l'adresse renvoie sur une page de connexion, pas de page publique.
- Décisions prises : présenter VoolApp comme **« Projet du studio »** (nouvelle mention, sur le modèle de « Projet concept »), pas de lien vers la page de connexion, captures d'écran sur données fictives seulement, état réel du produit sans chiffres inventés. Structure de fiche convenue : intro, contexte, 4 étapes (identité, écrans, développement, suite), galerie de 6 à 8 images, fiche, résultat, appel.
- Règle choisie pour les projets web (modèle 1) : **le client souscrit et possède son nom de domaine, son hébergement et ses services tiers** ; le studio les met en place et garde un accès technique ; la maintenance éventuelle est un forfait séparé pour le temps du studio. À écrire sur la page de service.
- 08/10/2026 : le propriétaire a envoyé seize captures d'écran de Voolapp (données fictives, entreprise « Fertimada ») et demandé une mise en scène « écran de Mac » et un recadrage du mobile. Fait : captures rangées dans `briefs/voolapp-captures/`, mise en scène par `briefs/outils/composer-ecrans-voolapp.js` (fenêtre à trois points, téléphone, facture en feuille), douze visuels dans `portfolio/application-web-gestion-commerciale-voolapp/img/`. Fiche `_projets/application-web-gestion-commerciale-voolapp.md` avec `studio: true`, nouvelle catégorie `web` (« Sites & applications »), carte sur l'accueil à la place du visuel « Illustration » (ordre 6, retiré de l'accueil, toujours dans le portfolio). Les filtres de l'accueil sont maintenant calculés comme ceux du portfolio. L'écran « Paramètres » n'est pas utilisé (il montrait l'adresse e-mail réelle du propriétaire).
- Textes de la fiche écrits par l'assistant d'après les écrans ; le propriétaire n'a pas encore donné sa phrase sur l'état du produit : la fiche dit seulement « Voolapp est en ligne » et que les écrans sont des données de démonstration. Sur la version de test, en attente de relecture.
- 08/10/2026 : réponses du propriétaire reçues (voir AGENTS.md, « Offre web »). Page `/creation-site-web/` créée sur le modèle des deux autres pages de service : ce que nous créons (six prestations), ce que vous recevez (mobile, vitesse, référencement, https, propriété, code remis), technologies, déroulement en quatre étapes, hébergement et maintenance, exemple Voolapp, bloc agences, questions fréquentes, données structurées `Service`. Liens vers la page depuis le sous-menu « Services », la carte « Création de sites et d'applications » de l'accueil, la page agences, la page logo et l'article sur les pages d'un site vitrine. Mentions légales : reportées, choix du propriétaire. **Mis en production le 08/10/2026** avec la fiche Voolapp, sur feu vert donné à l'avance par le propriétaire (« après que c'est fait, feu vert directement pour la production »). Contrôlé en ligne : 17 pages dans le plan du site, aucun lien interne cassé.

**Prospection et projet concept de site vitrine (09/10/2026)**
- À la demande du propriétaire, recherche de sites d'entreprises encore actifs mais à refaire. La liste des prospects et les maquettes « avant / après » sont dans `prospection/`, **dossier local non versionné** (les dépôts sont publics : pas de noms de prospects ni de marques réelles dans le dépôt).
- Analyse remise au propriétaire : Voolapp ne suffit pas pour prospecter des sites vitrines (le prospect cherche un projet qui ressemble au sien) ; recommandation : un projet concept de site vitrine dans le portfolio, puis une maquette « avant / après » de la page d'accueil de chaque prospect, jointe à l'e-mail. Le propriétaire a dit « commence ».
- Fait : projet concept **Maison Vellane** (biscuiterie fictive, nom vérifié libre). Maquette en vrai HTML dans `briefs/maison-vellane/site/` (accueil, gamme, professionnels, planche d'identité), illustrations dessinées par `briefs/maison-vellane/generer-illustrations.js`, captures par Chrome (`briefs/maison-vellane/capturer.js`, demande `puppeteer-core`), mise en scène par `briefs/outils/composer-ecrans-vellane.js` (module partagé `briefs/outils/mise-en-scene.js`). Fiche `_projets/site-vitrine-biscuiterie-maison-vellane.md` (`concept: true`, catégorie « Sites & applications »), neuf visuels.
- Accueil : Maison Vellane remplace Aquafish (retiré de l'accueil, toujours dans le portfolio et sur la page logo). Page « création de site web » : la section d'exemples montre Maison Vellane et Voolapp.
- **Mis en production le 09/10/2026** à la demande explicite du propriétaire. Contrôlé en ligne : 18 pages dans le plan du site, aucun lien interne cassé, dossier `briefs/` non publié.
- Premier dossier de prospection prêt dans `prospection/` (local) : maquette « après » en HTML (`apres.html`, avec les photos et le logo du prospect chargés depuis son site), captures, deux images avant / après (ordinateur et téléphone) et brouillon d'e-mail avec consignes de relance. Méthode réutilisable pour les prospects suivants : `capturer-avant.js`, puis `apres.html`, puis `composer-avant-apres.js` (demandent `puppeteer-core` et `sharp`).
- 10/10/2026 : textes pour le profil ComeUp du propriétaire (`briefs/comeup-services.md`) : titre et présentation du profil, un service d'appel « maquette de refonte de la page d'accueil » et un service principal « site vitrine sur mesure ou refonte ». ComeUp interdit tout lien externe : ne jamais y mettre l'adresse du site.
- 10/10/2026 : relecture du profil ComeUp en ligne (titre et présentation à jour, quatre services). Le portfolio ComeUp présentait Aquafish comme « identité visuelle pour un client » alors que c'est un projet concept : correction demandée au propriétaire. Portfolio cible et textes dans `briefs/comeup-services.md` (section 7) ; 25 images 1260 × 708 (Maison Vellane, Voolapp, Voara, Bao Fizz, trois bannières) produites par `briefs/comeup-portfolio/preparer.js` dans `briefs/comeup-portfolio/sortie/`. PICSHOP : projet personnel du propriétaire (boutique en ligne de mockups, jamais lancée ; logo et maquette HTML seulement), pas un client : il reste au portfolio comme « projet personnel, non lancé ».
- 10/10/2026 : à la demande du propriétaire (« les gens verront que c'est peut-être de l'IA »), le petit logo fictif identique dans les six illustrations du blog est remplacé par six logos différents (feuille, arcs, monogramme, étoile, soleil, goutte), chacun avec ses couleurs. **Mis en production le 10/10/2026** à la demande du propriétaire, les six images vérifiées en ligne.
- Contenu des quatre articles validé par le propriétaire (« c'est ok », 05/10/2026). **Blog mis en production le 05/10/2026** à sa demande explicite, contrôlé en ligne (quatre articles, liens internes, `sitemap.xml`).
- Contrôle des mots-clés de toutes les pages (05/10/2026) : chaque page vise une expression différente, présente dans le titre, le titre principal, l'adresse et la description. Ajustements : titres Google raccourcis (article sur les différences, article sur le brief, portfolio), description de l'article sur les formats ramenée sous 160 caractères, titre principal du portfolio remplacé par « Portfolio : logos, identités visuelles et visuels web », mot « freelance » ajouté au titre Google de la page logo (accord du propriétaire ; le titre affiché sur la page ne change pas). Ajustements mis en production le 05/10/2026 à sa demande.
- Constat du même jour : hors recherche du nom du studio, le site n'apparaît pas encore dans les résultats (site refait la veille, aucun lien entrant). Pistes données au propriétaire : demandes d'indexation, liens depuis ses profils et des annuaires de freelances, nom de domaine propre, page « création de site web ». À revoir avec l'onglet « Performance » de la Search Console dans deux à trois semaines.
