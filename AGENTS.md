# Instructions pour les assistants IA (Claude, Codex, etc.)

Ce fichier est lu automatiquement par les assistants de code. Il décrit le projet et les règles à suivre.
**Avant de travailler, lire aussi [HISTORIQUE.md](HISTORIQUE.md)** : il dit ce qui est fait, ce qui est en cours et ce qui reste à faire.
Les défauts connus du site et l'ordre de traitement proposé sont dans [AUDIT.md](AUDIT.md).
**À la fin de chaque session, mettre à jour HISTORIQUE.md** (journal daté + listes « en cours » / « à faire »).

## Le projet

- Site vitrine de **Gas'in Sary**, studio de graphisme et de création de sites web basé à Antananarivo (Madagascar), dirigé par Mirado R.
- **Cible du site : des clients étrangers**, pas des clients à Madagascar (précisé par le propriétaire le 04/10/2026). Deux publics : des **entreprises** qui commandent directement un logo, une identité ou un site, et des **agences** qui sous-traitent leur production graphique ou web. Francophones d'abord ; les anglophones sont acceptés, mais **le site reste en français**.
- Production : <https://gasinsary.github.io/> — dépôt `gasinsary/gasinsary.github.io`, branche `main`, publié par GitHub Pages.
- Le propriétaire n'est pas développeur de métier sur ces outils et écrit en **français** : répondre en français, en langage simple.
- Priorité du propriétaire : le **référencement (SEO)**. Le contenu doit être dans le HTML généré, pas chargé en JavaScript.

## Ton et positionnement des textes

Décidé avec le propriétaire les 03 et 04/10/2026. À respecter dans tout nouveau texte.

- **Madagascar est un argument de travail à distance, pas une zone de clientèle** : studio francophone, une à deux heures de décalage avec Paris, tout se fait à distance. Ne pas écrire pour un prospect local (pas de « près de chez vous », pas de référencement local).
- Le mot **« freelance »** est un mot recherché par cette cible (« graphiste freelance Madagascar ») : il est voulu dans le titre Google de l'accueil, dans le récit du parcours et dans le discours aux agences (« en sous-traitance, en freelance »). Le studio reste un « studio » dans le reste des textes.
- Le mot « agence » désigne les **clients** agences, jamais Gas'in Sary.
- Ne pas promettre ce que le propriétaire n'a pas confirmé (délai de réponse, moyens de paiement, nombre de retouches, tarifs).
- **Offre web, confirmée le 08/10/2026** : site vitrine, site sur mesure, application web et mobile, boutique en ligne, refonte. Technologies à citer : React, Next.js, HTML/CSS, PHP, MySQL, PostgreSQL, intégration d'IA. Le client souscrit et possède son nom de domaine et son hébergement ; le studio met en place et garde un accès technique. Maintenance possible, « à discuter » (ne pas en fixer le contenu ni le prix). Intégration à partir des maquettes des agences : oui. Pas de page de mentions légales pour l'instant (choix du propriétaire).

- Gas'in Sary est un **studio créatif** (jamais « agence »), fondé par Mirado avec sa femme, passionnée de marketing. C'est l'essence du studio.
- Mirado pilote chaque projet et s'appuie, **selon les projets**, sur un graphiste et un développeur partenaires (indépendants). Ne pas parler de salariés, d'équipe permanente ni d'« expansion ».
- **« Nous »** pour l'offre (services, portfolio, contact). **« Je »** uniquement dans le mot du fondateur et dans le récit du parcours.
- Titre de Mirado : « Fondateur » ou « Fondateur & directeur artistique » (jamais « CEO »).
- Offre : design graphique, identités visuelles, sites web et applications. Clients à Madagascar et à l'international.
- Ne pas citer le nom d'un client sans l'accord du propriétaire.
- **Projets concept** : un projet réalisé pour une marque fictive porte `concept: true`. La carte et la page affichent alors « Projet concept ». Ne jamais présenter une marque fictive comme un vrai client, ni inventer de témoignage.
- **Projets du studio** : un produit créé par Gas'in Sary pour son propre compte (ex. Voolapp) porte `studio: true` : la carte et la page affichent « Projet du studio ». Captures d'écran sur données fictives uniquement, jamais de lien vers une page de connexion, pas de chiffres d'usage inventés.
- Tous les textes en français, sans mots anglais d'interface (« Phone », « Loading »...).

## Technique

- **Jekyll intégré à GitHub Pages** (déploiement depuis la branche, pas de GitHub Actions). Versions imposées par GitHub : Jekyll 3.10, Liquid 4. N'utiliser que des extensions autorisées par GitHub Pages (ex. `jekyll-sitemap`).
- HTML/CSS/JS simples, basés sur le modèle *EasyFolio* de BootstrapMade (Bootstrap 5.3, AOS, GLightbox, Isotope, Swiper) dans `assets/`.
- **Ruby et Jekyll ne sont pas installés sur la machine du propriétaire, et il ne veut pas les installer.** Ne pas lui demander de le faire. La vérification se fait sur la version de test en ligne (voir « Publication »).

### Organisation des fichiers

| Emplacement | Rôle |
|---|---|
| `_config.yml` | Réglages Jekyll |
| `_layouts/default.html` | Squelette commun de toutes les pages |
| `_layouts/projet.html` | Page détaillée d'un projet du portfolio |
| `_layouts/article.html` | Page d'un article du blog |
| `_includes/` | `head.html` (balises SEO), `header.html` (menu), `footer.html`, `scripts.html`, `carte-portfolio.html`, `ligne-fiche.html`, `carte-article.html` (carte d'un article), `date-fr.html` (date en français) |
| `index.html` | Contenu de l'accueil |
| `portfolio/index.html` | Liste de toutes les réalisations |
| `externalisation-creation-graphique-madagascar/index.html` | Page de service pour les agences (sous-traitance graphique). Modèle à suivre pour les prochaines pages de services |
| `creation-logo-identite-visuelle/index.html` | Page de service « logo et identité visuelle », pour les entreprises |
| `creation-site-web/index.html` | Page de service « création de site web et d'application » (vitrine, sur mesure, application web et mobile, boutique, refonte) |
| `_projets/*.md` | Un fichier par projet avec page détaillée ; le nom du fichier donne l'adresse `/portfolio/<nom>/` |
| `blog/index.html` | Liste des articles du blog |
| `_posts/AAAA-MM-JJ-nom.md` | Un fichier par article du blog ; le nom du fichier donne la date et l'adresse `/blog/<nom>/` |
| `assets/img/blog/` | Images de couverture des articles |
| `_data/visuels.yml` | Visuels simples (image seule, sans page détaillée) |
| `_data/categories.yml` | Catégories et filtres du portfolio |
| `portfolio/<nom>/img/` | Images d'un projet |
| `briefs/` | Briefs de création des projets concept, maquette HTML du site Maison Vellane (`maison-vellane/`), captures d'écran d'origine de Voolapp (`voolapp-captures/`), outils de mise en scène (`outils/`, dont le module `mise-en-scene.js`) ; non publiés |
| `prospection/` | **Local, non versionné** (dans `.gitignore`) : liste des prospects, maquettes « avant / après » avec des marques réelles, brouillons d'e-mails. Ne jamais l'ajouter au dépôt : les deux dépôts sont publics |
| `assets/js/supabase.js` | Connexion Supabase (clé publique uniquement) |
| `mpatk.html` | Politique de confidentialité du chatbot MPATKBOT. Sans rapport avec le site : **ne pas modifier** |
| `googleaa7d45fdd426d7f9.html`, `google17eaf983518ef390.html` | Vérification Google Search Console (deux comptes Google) : **ne pas modifier ni supprimer** |

### Règles de code

- **Tous les liens et chemins internes passent par le filtre `relative_url`** (ex. `{{ '/assets/css/main.css' | relative_url }}`). Ne jamais écrire `/assets/...` ou `https://gasinsary.github.io/...` en dur : la version de test vit sous un sous-dossier.
- `baseurl` n'est volontairement pas défini dans `_config.yml` : GitHub Pages le règle selon le dépôt.
- Les adresses existantes ne doivent pas changer (SEO) : `/`, `/portfolio/`, les pages de `/portfolio/<projet>/`, `/externalisation-creation-graphique-madagascar/`, `/creation-logo-identite-visuelle/`, `/creation-site-web/`, `/blog/` et les articles de `/blog/<nom>/` (ne pas renommer le fichier d'un article publié).
- Chaque page définit `titre_seo` (ou `title`) et `description` dans son en-tête ; `_includes/head.html` produit le titre, la description, l'adresse canonique et les balises de partage.
- Tout fichier Markdown ajouté à la racine (documentation) doit être listé dans `exclude` de `_config.yml`, sinon Jekyll le publie comme une page.
- Dans un en-tête YAML, ne pas écrire `---` dans un commentaire.
- **Brouillons** : une fiche de `_projets/` avec `brouillon: true` (et `sitemap: false`) apparaît dans le portfolio de la version de test seulement. En production, sa carte est masquée et sa page porte `noindex`, mais **la page existe quand même à son adresse** : avant une mise en production, vérifier qu'aucun brouillon ne contient d'images provisoires, ou passer la fiche en `published: false`.
- **Images** : format WebP, 1024 px de large au maximum pour les visuels (1024 × 683 par défaut dans les modèles ; sinon préciser `largeur:` et `hauteur:`). Toute balise `<img>` porte `width` et `height`. `loading="lazy"` pour ce qui n'est pas visible au chargement.
- **Référencement d'une page projet** : `titre_seo` et `description` nomment le service et le lieu (ex. « visuels Instagram », « Antananarivo, Madagascar »), pas seulement la marque. Chaque image de `galerie` peut être un bloc `image:` + `alt:` pour un texte alternatif descriptif. Le champ `appel:` remplace le texte générique au-dessus du bouton de contact. Le modèle ajoute seul les données structurées (fil d'Ariane et réalisation).
- **Image de partage** (réseaux sociaux) : champ `image_partage:` en JPG ou PNG ; sans lui, `image:` est utilisée.
- **Diaporama Swiper** : la bibliothèque n'est chargée que si la page a `swiper: true` dans son en-tête (c'est le cas par défaut des pages de `_projets/`).
- Le logo de l'en-tête est `assets/img/logo-header.webp` (15 Ko). `logo.svg` (559 Ko, bitmap incorporé) ne doit plus être chargé par les pages.

### Blog

- Un article = un fichier Markdown `_posts/AAAA-MM-JJ-nom.md`. Le modèle `article` et l'adresse `/blog/<nom>/` sont réglés dans `_config.yml` : ne pas les répéter dans l'article. Un article daté dans le futur n'est pas publié.
- En-tête d'un article : `title`, `titre_court` (fil d'Ariane), `titre_seo`, `description`, `rubrique`, `resume` (texte de la carte), `image` (WebP, 1024 × 683, dans `assets/img/blog/`), `image_partage` (JPG), `alt`. Facultatifs : `maj` (date de mise à jour), `appel_titre` et `appel` (encart de fin d'article).
- `rubrique` sert à proposer les articles similaires dans « À lire aussi » : réutiliser exactement les rubriques existantes (« Identité visuelle », « Conseils », « Travail à distance », « Création de site web ») avant d'en créer une.
- Dans le texte : sous-titres en `##` puis `###` (le `#` est réservé au titre de la page), liens internes avec `relative_url`, par exemple `[notre page logo]({{ '/creation-logo-identite-visuelle/' | relative_url }})`. Chaque article renvoie vers au moins une page de service et, si possible, un autre article.
- Mêmes règles de ton que le reste du site : « nous », pas de promesse non confirmée, pas de client ni de témoignage inventé.
- **Le propriétaire écrit ses articles et les envoie pour mise en ligne** (toutes les une à deux semaines) : garder son texte, corriger les fautes, proposer le titre SEO, la description et les liens internes, puis passer par la version de test.
- Les quatre premiers articles ont été rédigés par l'assistant le 05/10/2026 avec des dates échelonnées du 25/08 au 02/10/2026, à la demande du propriétaire. Leurs illustrations sont produites par `briefs/outils/generer-visuels-blog.js`.

## Supabase

- Projet : « gasinsary's Project », référence `gjiqxswjczvbgkepicjw`, organisation « gasinsary's Org », plan gratuit, région eu-west-1.
- La base est vide (aucune table) au 03/10/2026.
- Seule la clé **publishable** peut figurer dans le code. Jamais de clé `secret` ni `service_role` dans le dépôt.
- Toute table créée doit avoir la sécurité par ligne (RLS) activée avec des règles explicites.
- Le portfolio ne doit **pas** être chargé depuis Supabase (décision SEO). Supabase sert aux fonctions dynamiques (formulaire de contact, etc.).

## Publication

Deux versions du site, deux dépôts GitHub sous le compte `gasinsary` :

| Version | Dépôt (remote git) | Adresse |
|---|---|---|
| **Production** | `gasinsary/gasinsary.github.io` (remote `origin`), branche `main` | <https://gasinsary.github.io/> |
| **Test (staging)** | `gasinsary/staging-t4sj762s` (remote `staging`), branche `main` | <https://gasinsary.github.io/staging-t4sj762s/> |

Marche à suivre :

1. Travailler sur la branche locale `staging`.
2. Publier sur la version de test : `git push staging staging:main`. GitHub régénère le site de test en une à deux minutes.
3. Le propriétaire vérifie la version de test.
4. Seulement après son accord explicite : fusionner `staging` dans `main`, puis `git push origin main` (mise en production).

- **Ne jamais pousser sur `origin main` sans l'accord explicite du propriétaire.** Ne pas commiter sans qu'il le demande.
- Le nom du dépôt de test est volontairement difficile à deviner, et la version de test porte une balise `noindex` (ajoutée automatiquement dans `_includes/head.html` quand `baseurl` n'est pas vide). Ne pas mettre de lien vers la version de test depuis le site de production.
- Les deux dépôts partagent exactement le même code : ne rien écrire qui dépende du nom du dépôt.
- Fichiers locaux non versionnés : `.mcp.json`, `.claude/`, `.env*`.
