# gasinsary.github.io
Portfolio Gas'in Sary

Le site est généré par [Jekyll](https://jekyllrb.com/), intégré à GitHub Pages : à chaque `git push`, GitHub reconstruit les pages.

## Organisation

| Emplacement | Rôle |
|---|---|
| `index.html` | Contenu de la page d'accueil |
| `portfolio/index.html` | Page qui liste toutes les réalisations |
| `_projets/` | Un fichier par projet avec page détaillée |
| `_data/visuels.yml` | Visuels simples du portfolio (image seule, sans page détaillée) |
| `_data/categories.yml` | Catégories et filtres du portfolio |
| `_layouts/`, `_includes/` | Modèles communs : en-tête, menu, pied de page, balises SEO |
| `_config.yml` | Réglages du site |

## Ajouter un projet avec une page détaillée

1. Copier `_projets/identite-visuelle-aquafish-by-gasinsary.md` et renommer la copie. Le nom du fichier devient l'adresse : `_projets/mon-projet.md` donne `/portfolio/mon-projet/`.
2. Mettre les images dans `portfolio/mon-projet/img/`, au format WebP, en 1024 × 683 px.
3. Remplir les champs du fichier (titres, description SEO, images, étapes...).
4. `ordre` règle la position dans la grille ; `accueil: true` affiche aussi la carte sur la page d'accueil.

## Projet concept et brouillon

Dans l'en-tête d'une fiche de `_projets/` :

- `concept: true` : la marque est fictive. « Projet concept » s'affiche sur la carte et sur la page.
- `brouillon: true` et `sitemap: false` : le projet n'apparaît dans le portfolio que sur la version de test. Supprimer ces deux lignes quand les vrais visuels sont en place.

Les briefs de création des projets concept sont dans le dossier `briefs/`.

## Ajouter un visuel simple

Ajouter un bloc dans `_data/visuels.yml` (titre, catégorie, image, résumé). Image au format WebP, en 1024 × 683 px, dans `assets/img/portfolio/`.
