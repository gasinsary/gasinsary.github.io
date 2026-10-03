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
- **Âge automatique** dans la fiche « À propos » de l'accueil (« 33 ans » écrit en dur) : en attente de la date de naissance du propriétaire (ou seulement mois et année s'il préfère ne pas publier le jour). Prévu : calcul par Jekyll à la génération + mise à jour en JavaScript à chaque visite.
- **Audit rendu** dans [AUDIT.md](AUDIT.md) : en attente du choix du propriétaire sur ce qu'il faut corriger en premier.

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
- `assets/img/portfolio/portfolio-2.jpg` n'est plus utilisée.
- Fautes de frappe dans les textes d'origine, conservées telles quelles (« échatillon », « Acceuil », « Visuelle »...).
- Le défilement vers les sections depuis une autre page (ex. `/#contact`) n'a pas pu être vérifié visuellement.

## Décisions prises

| Décision | Raison |
|---|---|
| Garder les adresses en dossiers (`/portfolio/<nom>/`) | Bon pour le SEO, adresses déjà connues de Google |
| Passer à Jekyll | Un seul modèle pour l'en-tête et le pied de page, un fichier par projet, balises SEO propres à chaque page, sitemap automatique. Le résultat publié reste du HTML pur |
| Ne pas charger le portfolio depuis Supabase | Le contenu serait absent du HTML : mauvais pour le SEO et pas d'aperçu sur les réseaux sociaux |
| Ne pas installer Ruby/Jekyll en local | Refus du propriétaire ; la validation passe par la version de test en ligne |
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
