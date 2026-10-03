# Instructions pour les assistants IA (Claude, Codex, etc.)

Ce fichier est lu automatiquement par les assistants de code. Il décrit le projet et les règles à suivre.
**Avant de travailler, lire aussi [HISTORIQUE.md](HISTORIQUE.md)** : il dit ce qui est fait, ce qui est en cours et ce qui reste à faire.
Les défauts connus du site et l'ordre de traitement proposé sont dans [AUDIT.md](AUDIT.md).
**À la fin de chaque session, mettre à jour HISTORIQUE.md** (journal daté + listes « en cours » / « à faire »).

## Le projet

- Site vitrine de **Gas'in Sary**, agence de graphisme et de création de sites web à Antananarivo (Madagascar), dirigée par Mirado R.
- Production : <https://gasinsary.github.io/> — dépôt `gasinsary/gasinsary.github.io`, branche `main`, publié par GitHub Pages.
- Le propriétaire n'est pas développeur de métier sur ces outils et écrit en **français** : répondre en français, en langage simple.
- Priorité du propriétaire : le **référencement (SEO)**. Le contenu doit être dans le HTML généré, pas chargé en JavaScript.

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
| `_includes/` | `head.html` (balises SEO), `header.html` (menu), `footer.html`, `scripts.html`, `carte-portfolio.html`, `ligne-fiche.html` |
| `index.html` | Contenu de l'accueil |
| `portfolio/index.html` | Liste de toutes les réalisations |
| `_projets/*.md` | Un fichier par projet avec page détaillée ; le nom du fichier donne l'adresse `/portfolio/<nom>/` |
| `_data/visuels.yml` | Visuels simples (image seule, sans page détaillée) |
| `_data/categories.yml` | Catégories et filtres du portfolio |
| `portfolio/<nom>/img/` | Images d'un projet |
| `assets/js/supabase.js` | Connexion Supabase (clé publique uniquement) |
| `mpatk.html` | Politique de confidentialité du chatbot MPATKBOT. Sans rapport avec le site : **ne pas modifier** |
| `googleaa7d45fdd426d7f9.html` | Vérification Google Search Console : **ne pas modifier ni supprimer** |

### Règles de code

- **Tous les liens et chemins internes passent par le filtre `relative_url`** (ex. `{{ '/assets/css/main.css' | relative_url }}`). Ne jamais écrire `/assets/...` ou `https://gasinsary.github.io/...` en dur : la version de test vit sous un sous-dossier.
- `baseurl` n'est volontairement pas défini dans `_config.yml` : GitHub Pages le règle selon le dépôt.
- Les adresses existantes ne doivent pas changer (SEO) : `/`, `/portfolio/`, `/portfolio/identite-visuelle-aquafish-by-gasinsary/`.
- Chaque page définit `titre_seo` (ou `title`) et `description` dans son en-tête ; `_includes/head.html` produit le titre, la description, l'adresse canonique et les balises de partage.
- Tout fichier Markdown ajouté à la racine (documentation) doit être listé dans `exclude` de `_config.yml`, sinon Jekyll le publie comme une page.
- Dans un en-tête YAML, ne pas écrire `---` dans un commentaire.

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
