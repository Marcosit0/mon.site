/* ============================================================================
   LA CLIQUE — script.js
   JavaScript vanilla, zéro dépendance. Deux rôles :
     1. Ouvrir / fermer le menu de navigation en mobile
     2. Faire apparaître les cartes en fondu quand on scrolle (.reveal)
     3. Mettre l'année à jour automatiquement dans le footer

   Tu n'as normalement jamais besoin de toucher à ce fichier pour ajouter
   du contenu — tout se passe dans les fichiers .html.
   ============================================================================ */

(function () {
  "use strict";

  /* Signale au CSS que JavaScript est actif.
     → tant que cette classe n'est pas là, les .reveal restent visibles,
       donc le site reste lisible même si le JS ne se charge pas. */
  document.documentElement.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------------------------------
       1. MENU MOBILE
       ---------------------------------------------------------------------- */
    var toggle = document.querySelector(".nav__toggle");
    var links  = document.querySelector(".nav__links");

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("nav__links--open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.textContent = open ? "✕" : "☰";
      });

      /* On referme le menu après avoir cliqué sur un lien */
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          links.classList.remove("nav__links--open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "☰";
        }
      });
    }

    /* ----------------------------------------------------------------------
       2. APPARITION DES CARTES AU SCROLL
       ---------------------------------------------------------------------- */
    var revealables = document.querySelectorAll(".reveal");

    /* Petit décalage en cascade : chaque élément apparaît juste après son
       voisin (joli effet sur une grille de cartes). */
    revealables.forEach(function (el) {
      var siblings = Array.prototype.filter.call(
        el.parentElement.children,
        function (c) { return c.classList.contains("reveal"); }
      );
      var index = siblings.indexOf(el);
      el.style.setProperty("--delay", (index % 8) * 70 + "ms");
    });

    /* Si le navigateur ne gère pas IntersectionObserver, on affiche tout. */
    if (!("IntersectionObserver" in window)) {
      revealables.forEach(function (el) { el.classList.add("in-view"); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target); // une seule fois
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

      revealables.forEach(function (el) { observer.observe(el); });
    }

    /* ----------------------------------------------------------------------
       3. ANNÉE DU FOOTER (mise à jour automatique)
       ---------------------------------------------------------------------- */
    var yearEl = document.querySelector("[data-year]");
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  });
})();
