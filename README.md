# 🎡 Roulette européenne — simulateur local

Simulateur pédagogique de roulette européenne (37 cases, 0 à 36, **un seul zéro**),
en **jetons fictifs uniquement**. Aucun argent réel, aucun compte, aucun dépôt/retrait,
aucune connexion réseau, aucun suivi.

## Lancer

Aucune installation, aucun build, aucune dépendance :

```bash
# option 1 — ouvrir directement le fichier
xdg-open index.html      # ou : double-clic sur index.html

# option 2 — petit serveur local
python3 -m http.server 8000   # puis http://localhost:8000
```

Après le premier chargement, **tout fonctionne hors-ligne** : aucune ressource externe,
aucune police distante, aucune API.

## Contenu

Un seul fichier : `index.html` (HTML + CSS + JS vanilla inline).

Le découpage en plusieurs fichiers `.js` a été volontairement écarté : des modules ES
seraient bloqués par la politique CORS en `file://`, ce qui casserait l'ouverture par
simple double-clic. Le JS est organisé en sections numérotées et commentées :

| § | Contenu |
|---|---|
| 1 | Constantes de la roulette (ordre réel de la roue, couleurs) |
| 2 | Générateur aléatoire uniforme sur 0..36 |
| 3 | Définition des mises et des gains |
| 4 | Construction de la table de mises |
| 5 | État du jeu (mode manuel) |
| 6 | Pose des mises |
| 7 | La roue (SVG) |
| 8 | Résolution d'un tour |
| 9 | Simulation automatique + graphique |
| 10 | Audit du générateur aléatoire (tests statistiques) |
| 11 | Onglets |

## Mode 1 — Mise manuelle

- Roue à 37 cases dans **l'ordre réel** d'une roulette européenne
  (`0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33,
  1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26`), animation simple de la roue et de la bille.
- Bankroll fictive configurable (1000 jetons par défaut), affichée en permanence
  avec le total misé, le net et le nombre de tours.
- Historique des **20 derniers tirages** avec leurs couleurs, plus le décompte rouge / noir / zéro.
- Journal détaillé de chaque tour (mise par mise, gagnante ou perdante).

### Table de mises

**157 mises différentes** sont cliquables sur une vraie disposition de table.
Clic gauche = poser le jeton sélectionné · clic droit = retirer la mise ·
le survol surligne les numéros couverts.

| Mise | Numéros | Gain |
|---|---|---|
| Plein | 1 | 35:1 |
| Cheval | 2 adjacents (0/1, 0/2, 0/3 inclus) | 17:1 |
| Transversale | 3 en ligne (+ 0/1/2 et 0/2/3) | 11:1 |
| Carré | 4 (+ 0/1/2/3) | 8:1 |
| Sixain | 6 | 5:1 |
| Colonne | 12 | 2:1 |
| Douzaine | 12 (1-12, 13-24, 25-36) | 2:1 |
| Chances simples | 18 (rouge/noir, pair/impair, manque/passe) | 1:1 |

Les mises se **cumulent** librement sur un même tour. Boutons *Annuler*, *Effacer*,
*Répéter* (rejoue les mises du tour précédent) et *×2 Doubler*.

## Mode 2 — Stratégie automatique

Panneau séparé simulant un système de mise sur une chance simple
(rouge, noir, pair, impair, manque, passe) :

| Stratégie | Règle |
|---|---|
| **Martingale** | mise ×2 après chaque perte, retour à la mise de base après un gain |
| **D'Alembert** | +1 unité après une perte, −1 unité après un gain (plancher : 1 unité) |
| **Fibonacci** | avance d'un cran dans la suite après une perte, recule de deux crans après un gain |
| **Paroli** | mise ×2 après chaque gain, retour à la mise de base après une perte |
| **Mise plate** | référence, aucun système |

Paramètres : bankroll de départ, mise de base, nombre de tours (jusqu'à 200 000),
stop-loss, stop-win, plafond de mise optionnel.

*Lancer la simulation* calcule tous les tours d'un coup (pas d'animation) et affiche :

- un **graphique en courbe** de l'évolution de la bankroll tour par tour ;
- le **résultat final** : gain/perte net, bankroll finale, tours joués, taux de gain,
  zéros sortis, pic, plus bas, drawdown maximal, mise la plus élevée, et la **raison
  de l'arrêt** (tours épuisés, stop-loss, stop-win, ou ruine).

*Lancer 500 simulations* rejoue la même configuration 500 fois et donne la distribution :
net moyen, % de sessions gagnantes, % de stop-win atteints, % de ruines, meilleure et pire session.
C'est là que l'avantage de la maison devient visible malgré les systèmes de mise.

La simulation est un **bac à sable indépendant** : elle ne touche pas à la bankroll du mode manuel.

## Mode 3 — Audit RNG

Panneau **totalement indépendant du jeu** : aucune mise, aucune bankroll, aucune stratégie.
Il tire des numéros bruts avec **exactement la même fonction `spinNumber()`** que la roue et
les simulations, puis confronte les fréquences observées aux fréquences théoriques.
Nombre de tirages configurable, **1 000 000 par défaut** (~100 ms, exécuté par blocs avec
barre de progression pour ne pas figer l'onglet).

Le panneau affiche, avec le **pourcentage théorique attendu en regard de chaque pourcentage obtenu** :

1. **Répartition des couleurs** — rouge / noir / vert (0) : effectifs, % obtenu, % théorique
   (48,6486 % / 48,6486 % / 2,7027 %), écart en points et écart réduit (σ).
2. **Fréquence de chacun des 37 numéros** — chaque numéro doit converger vers 2,7027 %.
   Tableau triable par numéro ou par écart décroissant, plus un graphique des écarts réduits
   avec les bandes de tolérance ± 2 σ et ± 3 σ (survol pour le détail d'un numéro).
3. **Longueur des séries** — combien de fois le rouge sort 1, 2, 3, … 9, 10+ fois d'affilée,
   et la même chose pour le noir, **côte à côte**, avec une colonne « % théorique » commune.
   Une série s'arrête dès que la couleur change *ou que le zéro sort* ; elle se prolonge avec
   la probabilité 18/37, donc sa longueur suit une loi géométrique identique pour les deux couleurs.

### Quatre tests statistiques, pas seulement des comptages

Des effectifs bruts ne prouvent rien : sur un million de tirages, rouge et noir **ne tombent
jamais** exactement à égalité. Le panneau calcule donc l'écart attendu et conclut :

| Test | Ce qu'il détecte |
|---|---|
| Khi-deux d'ajustement sur les 37 numéros (36 ddl) | un ou plusieurs numéros sur- ou sous-représentés |
| Écart réduit bilatéral rouge / noir | un déséquilibre entre les deux couleurs |
| Khi-deux sur les séries rouges (9 ddl) | des séries anormalement longues ou courtes |
| Khi-deux sur les séries noires (9 ddl) | idem, indépendamment du rouge |

Le test rouge/noir se réduit à `z = (R − N) / √(R + N)` : conditionnellement au nombre de tours
non nuls, le rouge suit une binomiale de paramètre 1/2. Les p-values sont calculées exactement
(fonction gamma incomplète régularisée pour le khi-deux, `erfc` pour la loi normale) et
**vérifiées contre les tables publiées** : χ²(50,998 ; 36 ddl) → p = 0,05000,
χ²(16,919 ; 9 ddl) → p = 0,05000, z = 1,959964 → p = 0,050000.

Le verdict indique aussi le **pouvoir de détection** : sur 1 000 000 de tirages, un déséquilibre
supérieur à ~0,13 point sur la part du rouge est repéré de façon fiable. « Aucun biais détecté »
signifie donc « aucun biais à cette résolution », jamais « biais nul ».

### Le panneau a été validé sur des générateurs volontairement biaisés

Un audit qui répondrait toujours « tout va bien » ne prouverait rien. Les tests ont donc été
confrontés à des générateurs truqués :

| Générateur injecté | Résultat |
|---|---|
| Sain (contrôle négatif) | aucun test déclenché ✅ |
| 0,5 % des noirs redirigés vers le rouge | détecté (χ² numéros p ≈ 5·10⁻¹⁰ ; test rouge/noir 8 fois sur 8 sur 1 M) |
| Numéro 17 surreprésenté (3 % des 18) | détecté (p ≈ 5·10⁻⁴) |
| Couleurs « collantes » (+3 % de répétition, équilibre rouge/noir intact) | détecté **par le seul test de séries** (p ≈ 9·10⁻²³) |

Le dernier cas est le plus parlant : un biais qui allonge les séries sans toucher au total
rouge/noir est invisible pour les deux premiers tests, et c'est précisément pour cela que la
distribution des séries est mesurée.

### Résultat sur le générateur réellement utilisé

Sur 1 000 000 de tirages, les 4 tests passent systématiquement au seuil de 1 % : aucun écart
entre rouge et noir au-delà de la fluctuation normale, aucun numéro hors de ± 3 σ, séries
conformes à la loi géométrique. **Rien ne permet d'affirmer que le générateur favorise une
couleur.** Le désavantage du joueur ne vient pas d'un déséquilibre rouge/noir — il vient
uniquement du **zéro**.

## Détails techniques

**Tirage aléatoire.** `crypto.getRandomValues` (repli sur `Math.random()` si indisponible),
avec **rejet de la queue** pour éviter le biais du modulo : `2^32 % 37 ≠ 0`, donc les
valeurs `≥ 2^32 − (2^32 mod 37)` sont retirées. La distribution est donc rigoureusement
uniforme sur les 37 cases. Vérifié sur 370 000 tirages : chaque case sort ~10 000 fois
(min 9 834, max 10 099).

**Zéro.** Le zéro fait perdre les chances simples — les règles « en prison » et
« la partage » ne sont pas implémentées, ce qui donne bien l'avantage maison de 2,70 %.

**Cohérence des gains.** Toutes les mises vérifient l'identité
`(gain + 1) × (numéros couverts / 37) = 36/37`, soit une espérance de **−1/37 = −2,70 %**
identique pour chacune. Mesuré sur 2 000 000 de tours en mise plate : **−2,737 %**
(théorie −2,703 %).

## ⚠️ Rappel

L'espérance mathématique reste **négative sur le long terme, quel que soit le système de mise**.
L'avantage de la maison sur la roulette européenne est de **2,70 % (1/37)** : chaque jeton misé
rapporte en moyenne **−2,70 %**. Martingale, D'Alembert, Fibonacci et Paroli ne modifient
pas cette espérance — ils ne font que redistribuer la forme des gains et des pertes
(beaucoup de petits gains contre de rares pertes énormes, ou l'inverse). Aucun système
ne transforme une espérance négative en espérance positive.

Ce projet est un outil pédagogique destiné à le démontrer, pas un jeu d'argent.
