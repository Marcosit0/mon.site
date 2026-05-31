# 🏔️ La Clique — Souvenirs entre potes (Valais)

Petit site statique pour archiver les sorties d'une bande de 6 ami·e·s.
HTML / CSS / JavaScript **100 % vanilla**, zéro framework, zéro dépendance
(à part Google Fonts). Conçu pour être édité à la main et hébergé sur
**GitHub Pages**.

---

## 📁 Les fichiers

```
monsite/
├── index.html          ← Page d'accueil (hero, catégories, derniers souvenirs)
├── peche.html          ← Catégorie Pêche      (accent bleu)
├── bowling.html        ← Catégorie Bowling    (accent rouge)
├── escape-game.html    ← Catégorie Escape Game (accent vert)
├── style.css           ← TOUT le design (partagé par les pages, bien commenté)
├── script.js           ← Menu mobile + animations au scroll (à ne pas toucher)
├── images/             ← Tes photos vont ici (voir images/README.md)
└── .nojekyll           ← Dit à GitHub Pages de servir les fichiers tels quels
```

---

## ✍️ Ajouter un souvenir (le plus courant)

1. Ouvre la page de la catégorie (ex. `peche.html`).
2. Cherche le repère `▼▼▼ DÉBUT DES CARTES ▼▼▼`.
3. Copie-colle un bloc carte entier et modifie-le :

```html
<article class="card reveal">
  <div class="card__photo" data-icon="🎣">
    <img src="images/MA-PHOTO.jpg" alt="Décris la photo" loading="lazy" onerror="this.style.display='none'">
  </div>
  <div class="card__body">
    <span class="card__date">JJ mois AAAA</span>
    <h3 class="card__title">Titre du souvenir</h3>
    <p class="card__note">Ta petite anecdote ici.</p>
  </div>
</article>
```

4. (Optionnel) Dépose la photo dans `images/` — sinon l'emoji s'affiche.
5. (Optionnel) Copie la même carte dans la section **« Derniers souvenirs »**
   de `index.html` pour la mettre en avant sur l'accueil.

> 💡 Pas besoin de toucher au `data-category` du `<body>` : la couleur de la
> page (bleu / rouge / vert) s'applique automatiquement à la nouvelle carte.

---

## ➕ Ajouter une nouvelle catégorie (ex. « Ski »)

1. **Duplique** une page existante, ex. `peche.html` → `ski.html`.
2. En haut du `<body>`, mets : `<body data-category="ski">`.
3. Dans `style.css`, section **2**, ajoute la couleur d'accent :
   ```css
   body[data-category="ski"] { --accent: #6ec1ff; --accent-soft: #9ad4ff; }
   ```
4. Adapte le titre, l'emoji et les cartes de la nouvelle page.
5. Ajoute le lien `<li><a href="ski.html">⛷️ Ski</a></li>` dans le `<header>`
   de **toutes** les pages.
6. Sur `index.html`, ajoute une vignette dans la section « Les catégories »
   (copie un bloc `<a class="cat-card">…</a>`).

---

## 🎨 Personnaliser

- **Nom du site / prénoms** : cherche les commentaires `✏️` dans les fichiers HTML.
  Les 6 prénoms sont dans le `<footer>` de chaque page (`<ul class="crew">`).
- **Couleurs, polices, espacements** : tout est en haut de `style.css`
  (section 1, les `--variables`).
- **Polices** : Fraunces (titres), Caveat (manuscrit), Space Grotesk (texte),
  chargées via Google Fonts dans le `<head>`.

---

## 🚀 Mettre en ligne sur GitHub Pages

1. Crée un dépôt GitHub et pousse **tous ces fichiers** à la racine du dépôt.
   ```bash
   git init
   git add .
   git commit -m "Premier jet du site La Clique"
   git branch -M main
   git remote add origin https://github.com/TON-PSEUDO/TON-DEPOT.git
   git push -u origin main
   ```
2. Sur GitHub : **Settings → Pages**.
3. **Source** : « Deploy from a branch », branche `main`, dossier `/ (root)`.
4. Patiente ~1 minute : le site est en ligne sur
   `https://TON-PSEUDO.github.io/TON-DEPOT/`.

> Astuce : pour le tester en local avant de pousser, ouvre simplement
> `index.html` dans ton navigateur (double-clic). Tout fonctionne sans serveur.

---

Fait avec ❤️ en Valais.
