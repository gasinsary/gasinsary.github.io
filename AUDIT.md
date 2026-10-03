# Audit du site Gas'in Sary

Date : 03/10/2026. Version auditée : la version de test (branche `staging`), sur les trois pages : accueil, portfolio, projet Aquafish.

Méthode : lecture du code, mesures dans le navigateur à trois largeurs (mobile 375 px, tablette 768 px, ordinateur 1366 px), captures d'écran de chaque page sur mobile et ordinateur, contrôle des liens et des poids de fichiers.

Limites : le formulaire de contact n'a pas été envoyé pour de vrai (cela expédie un e-mail). Les animations d'apparition ont été désactivées pendant les captures. Aucun test sur un vrai téléphone ni mesure de vitesse sur réseau mobile.

## Suivi des corrections

| Date | Points traités | État |
|---|---|---|
| 03/10/2026 | 1.2 liens téléphone, e-mail et WhatsApp ; 1.3 e-mail coupé ; 1.4 marges de la page projet ; 1.5 croix du menu mobile ; 1.9 âge automatique | Corrigé sur la version de test |
| 03/10/2026 | 1.1 formulaire de contact | Réécrit sur la version de test. Vérifié avec des réponses simulées (succès, refus, panne réseau). **Reste à faire : un envoi réel par le propriétaire.** |
| 03/10/2026 | 2.1 titres `<h1>` sur l'accueil et le portfolio ; 2.6 description raccourcie ; section 3 : positionnement « studio », textes en anglais traduits, fautes corrigées | Corrigé sur la version de test |
| 03/10/2026 | Vitesse de chargement : logo de l'en-tête (559 Ko → 15 Ko), photo et visuels convertis en WebP (4,5 Mo → 0,6 Mo au total), dimensions sur toutes les images, chargement différé, Swiper chargé seulement sur les pages projet ; 2.7 faux témoignages retirés du code | Corrigé sur la version de test |

Correction du rapport initial : le point 1.4 indiquait une quatrième miniature rognée sur mobile. Après mesure, les miniatures sont bien centrées ; seuls le texte d'introduction et le fil d'Ariane posaient problème.

## Résumé

Le site est cohérent visuellement et ne déborde à aucune largeur. Les trois problèmes qui pèsent le plus :

1. **Le site vend des sites web mais n'en montre aucun.** Le portfolio contient six visuels et une seule étude de cas, toutes graphiques.
2. **Un prospect ne peut pas vous joindre en un geste.** Téléphone et e-mail ne sont pas cliquables, il n'y a pas de lien WhatsApp, et le formulaire affiche probablement une erreur même quand le message part.
3. **Les pages sont lourdes pour un réseau mobile.** L'accueil pèse 1,5 Mo, dont 559 Ko pour le seul logo.

## 1. Erreurs que rencontre un visiteur

| # | Problème | Où | Gravité |
|---|---|---|---|
| 1.1 | Le formulaire affiche probablement une erreur alors que le message est parti. Le script attend la réponse `OK`, que formsubmit.co ne renvoie pas. Le visiteur croit à un échec. Vérifié : formsubmit accepte bien les envois du site. Non vérifié : l'affichage exact après envoi. | Accueil, contact | Haute |
| 1.2 | Téléphone et e-mail sont du texte simple : impossible d'appeler ou d'écrire d'un geste. Aucun lien WhatsApp, alors qu'une icône WhatsApp figure sur la page projet. | Accueil, page projet | Haute |
| 1.3 | Sur mobile, l'e-mail est coupé dans la fiche « À propos » (« direction.gasinsa… »). | Accueil | Moyenne |
| 1.4 | Sur mobile, le texte d'introduction touche les deux bords de l'écran et le fil d'Ariane est coupé à droite. | Page projet | Moyenne |
| 1.5 | Sur mobile, menu ouvert : la croix de fermeture recouvre l'icône LinkedIn. | Toutes | Moyenne |
| 1.6 | Une adresse inexistante affiche la page d'erreur de GitHub, en anglais, sans lien de retour. Il n'y a pas de page 404 du site. | Tout le site | Moyenne |
| 1.7 | Sur l'accueil, le menu surligne « Resume » pendant qu'on regarde la section portfolio. | Accueil | Faible |
| 1.8 | Le bouton « retour en haut » recouvre la fin de certaines lignes de texte sur mobile. | Toutes | Faible |
| 1.9 | L'âge « 33 ans » est figé. | Accueil | Faible (correction prévue) |

## 2. Référencement (SEO)

### Déjà corrigé sur la version de test, pas encore en production

- Les pages portfolio déclaraient l'accueil comme adresse officielle, ce qui les excluait de Google.
- Titre et description propres à chaque page.
- `sitemap.xml` et `robots.txt` : absents en production (erreur 404), générés sur la version de test.

### À corriger

| # | Problème | Gravité |
|---|---|---|
| 2.1 | Aucun titre principal `<h1>` sur l'accueil ni sur la page portfolio. Google s'en sert pour comprendre le sujet de la page. | Haute |
| 2.2 | Une seule page de contenu en dehors de l'accueil (Aquafish). Chaque projet détaillé est une page de plus qui peut ressortir dans Google. | Haute |
| 2.3 | Aucune donnée structurée décrivant l'entreprise (nom, adresse à Andoharanofotsy, téléphone, réseaux sociaux). Elle aide Google à afficher une fiche locale. | Moyenne |
| 2.4 | Les mots « Madagascar » et « Antananarivo » n'apparaissent dans aucun titre de section visible. | Moyenne |
| 2.5 | Cartes du portfolio aux titres génériques et répétés (« Illustration » deux fois, « Visuelle pour réseau sociaux » deux fois). Ni le client ni le sujet ne sont nommés. | Moyenne |
| 2.6 | La description de l'accueil fait 164 caractères ; Google coupe vers 155 à 160. | Faible |
| 2.7 | Le bloc « témoignages » désactivé reste dans le code de l'accueil : 160 lignes de faux texte latin. | Faible |
| 2.8 | `mpatk.html` (chatbot MPATKBOT) figure dans le sitemap alors qu'elle est sans rapport avec l'agence. | Faible |

### Vitesse de chargement

Accueil : 32 fichiers, 1,5 Mo.

| Fichier | Poids | Remarque |
|---|---|---|
| `logo.svg` | 559 Ko | Chargé sur toutes les pages. Le fichier contient une image bitmap incorporée. Un vrai SVG ou un WebP ferait environ 10 Ko. |
| `MiradoR.jpg` | 421 Ko | 1024 × 1024 px, affichée bien plus petite. |
| Visuels du portfolio | 170 à 600 Ko chacun | En JPG. Le format WebP diviserait le poids par deux ou trois. |
| `bootstrap.min.css` | 227 Ko | Normal pour ce modèle. |
| `swiper-bundle.min.js` | 151 Ko | Chargé sur l'accueil et le portfolio, où aucun diaporama n'est actif. |

- Aucune image n'indique ses dimensions dans le code : la page « saute » pendant le chargement.
- Trois familles de polices Google sont demandées avec toutes leurs graisses (Roboto, Noto Sans, Questrial).
- La bibliothèque Supabase est chargée sur l'accueil sans être encore utilisée.

### Hors du code

- Adresse en `github.io` : un nom de domaine propre (`.mg` ou `.com`) est plus crédible et vous appartient.
- Après la mise en production, déclarer le `sitemap.xml` dans Google Search Console.
- Je n'ai pas pu vérifier si une fiche Google Business Profile existe.

## 3. Du point de vue d'un prospect

### Ce qui fait douter

- **Qui est derrière ?** Le site dit tour à tour « freelance », « marque créative indépendante », « agence en pleine expansion » et « CEO ». Il passe de « je » à « nous » d'un paragraphe à l'autre. Choisir une seule posture.
- **Aucune preuve côté web.** « Création de site vitrine » est un service phare, mais le portfolio ne montre aucun site.
- **Barres de compétences à 95 %, 98 %, 100 %.** Elles ne prouvent rien, et « Et bien plus… 100 % » ne veut rien dire. Des chiffres réels parlent davantage : années d'activité, nombre de projets, délais.
- **Fiche personnelle façon CV.** Âge, nationalité et « Chief Executive Officier » n'aident pas un client à décider.
- **Un seul témoignage** sur tout le site, sur la page Aquafish. Aucun sur l'accueil.
- **Aucune indication de prix, de délai ni de méthode de travail.**

### Parcours

- Sur mobile, l'accueil fait environ 13 écrans de haut. Le contact est tout en bas, après un long historique (« Résumé »).
- La page portfolio s'arrête net après la grille, sans bouton de contact.
- Le titre « Maintenant » au-dessus de l'appel à l'action de la page projet n'est pas clair.

### Textes

- Mélange français et anglais : « Phone », « The Birth », « Loading », « All Rights Reserved », « Designed and Developed by », « Resume » (dans le menu).
- Fautes relevées :

| Écrit | Correction |
|---|---|
| échatillon | échantillon |
| Réalisation créatives | Réalisations créatives |
| Acceuil | Accueil |
| sesibilité | sensibilité |
| technoligiques | technologiques |
| réacitf | réactif |
| Officier | Officer |
| Envoyé Message | Envoyer le message |
| Visuelle pour réseau sociaux | Visuel pour réseaux sociaux |
| posts Facebooks | posts Facebook |
| réaliser par | réalisée par |
| en alaska | en Alaska |
| N'hesitez | N'hésitez |
| Photoshop / Illust.. | Photoshop / Illustrator |

## 4. Affichage par page et par écran

| Page | Mobile (375 px) | Tablette (768 px) | Ordinateur (1366 px) |
|---|---|---|---|
| Accueil | Pas de débordement. Défauts 1.3, 1.5, 1.8. Page très longue. | Pas de débordement. | Cohérent. Défaut 1.7. |
| Portfolio | Cohérent. Filtres sur deux lignes, lisibles. | Non capturé. | Cohérent. |
| Projet Aquafish | Défaut 1.4 (corrigé). Diaporama, miniatures et accordéon fonctionnent. | Non capturé. | Cohérent. |

Les miniatures de la page projet s'ouvrent bien en grand au clic.

## 5. Accessibilité

- **Contraste insuffisant** : le bleu `#1C99BB` sur blanc atteint 3,3 pour 1 (boutons, catégories, dates), l'orange du menu actif 3,0 pour 1. Le minimum recommandé pour du texte courant est 4,5 pour 1.
- **Dix liens en icône seule sans nom** (réseaux sociaux, loupe des visuels) : illisibles pour un lecteur d'écran.
- **Cinq champs de formulaire sans étiquette**, seulement un texte indicatif qui disparaît à la saisie.
- **Zones tactiles petites** : icônes sociales de l'en-tête (22 × 24 px) et bouton du menu (28 × 34 px), pour 44 px recommandés.

## 6. Points à vérifier par le propriétaire

- **Licence du modèle** : le code d'origine précise que le lien vers BootstrapMade en pied de page ne peut être retiré qu'avec la version payante. Il a été retiré. À vérifier si la licence a été achetée.
- **Adresse e-mail** : elle est en clair dans le code et dans l'adresse d'envoi du formulaire, donc récupérable par les robots de spam. formsubmit.co propose un identifiant masqué.
- **Anti-spam** : le champ `_captcha` est réglé sur `false`, ce qui désactive la vérification anti-robot de formsubmit. Seul le champ piège reste actif.

## Ordre de traitement proposé

1. Contact : liens téléphone, e-mail et WhatsApp, formulaire qui confirme correctement l'envoi (1.1, 1.2).
2. Défauts d'affichage mobile (1.3, 1.4, 1.5).
3. Titres `<h1>`, fautes et textes en anglais (2.1, section 3).
4. Poids : logo, photo, visuels en WebP, dimensions des images.
5. Contenu : ajouter des projets, dont des sites web, avec des titres précis (2.2, 2.5).
6. Page 404, données structurées, contraste et accessibilité.
7. Repenser la section « À propos » et les barres de compétences.
