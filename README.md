# KOKO.PROD — Site vitrine

Site one-page de l'agence de création de contenu vidéo IA **KOKO.PROD**.

Architecture inspirée des pages produit Apple : sticky scenes, scroll-driven animations, FLIP lightbox vidéo, custom cursor magnetic. Aucune vidéo n'est chargée tant que l'utilisateur n'a pas cliqué.

---

## Stack

- **Astro 4** (output statique)
- **TailwindCSS 3** (utilitaires + design tokens)
- **TypeScript** partout
- **GSAP 3** + plugin `ScrollTrigger` (gratuit depuis 2025)
- **Lenis** (`@studio-freight/lenis`) pour le smooth scroll
- Implémentation maison légère de `SplitText` (par char / par mot)
- Animation FLIP de la lightbox via **Web Animations API** (zéro plugin payant)

---

## Commandes

```bash
npm install        # installer les dépendances
npm run dev        # serveur de dev (http://localhost:4321)
npm run build      # build statique vers ./dist
npm run preview    # preview du build
```

---

## Structure du projet

```
src/
├── layouts/
│   └── Base.astro              # <head>, fonts, monte CustomCursor + VideoLightbox, bootstrap JS
├── components/
│   ├── Header.astro            # nav sticky avec morphing au scroll + burger mobile
│   ├── Hero.astro              # scène pinned : titre marker, tagline, décors flottants
│   ├── SectionExamplesVertical.astro    # grille 4 phones cliquables
│   ├── SectionExamplesHorizontal.astro  # 2 vidéos 16:9 cliquables
│   ├── PhoneFrame.astro        # frame iPhone + poster + play overlay
│   ├── HorizontalVideoCard.astro
│   ├── SectionDivider.astro    # mot géant scroll-traverse
│   ├── VideoLightbox.astro     # singleton modal (FLIP-animated)
│   ├── DecorBolt.astro         # SVG éclair + sphère violet
│   ├── DecorCrystal.astro      # SVG cristal polyédrique violet
│   ├── CustomCursor.astro
│   └── Footer.astro
├── pages/
│   └── index.astro             # composition de la page
├── data/
│   └── projects.ts             # source unique des projets affichés
├── scripts/
│   ├── smooth-scroll.ts        # Lenis + sync GSAP
│   ├── scroll-animations.ts    # toutes les timelines ScrollTrigger
│   ├── split-text.ts           # SplitText maison (par char / par mot)
│   ├── phone-tilt.ts           # tilt 3D mousemove
│   ├── cursor.ts               # logique curseur magnetic
│   ├── lightbox.ts             # gestionnaire singleton VideoLightbox (FLIP via WAAPI)
│   └── preload-on-hover.ts     # anticipation de chargement vidéo
└── styles/
    └── global.css              # reset, CSS vars (design system), helpers
public/
├── posters/                    # 8 verticaux + 2 horizontaux (placeholders SVG)
├── videos/                     # vide à remplir avec les vrais MP4
└── favicon.svg
```

---

## Comment ajouter un projet

1. **Déposer la vidéo** dans `public/videos/` :
   - Vertical : `public/videos/vertical-XX.mp4` (format 9:16, ~20 Mo max)
   - Horizontal : `public/videos/horizontal-XX.mp4` (format 16:9)

2. **Générer 3 posters** (AVIF / WebP / JPG) dans `public/posters/` :
   - Dimensions : 540×960 pour vertical, 960×540 pour horizontal
   - Outils recommandés : [Squoosh](https://squoosh.app/), [@squoosh/cli](https://github.com/GoogleChromeLabs/squoosh), ou ffmpeg :
     ```bash
     ffmpeg -i vertical-09.mp4 -vf "scale=540:960,thumbnail" -frames:v 1 vertical-09.jpg
     # puis convertir avec cwebp et avifenc / Squoosh
     ```
   - Naming : `vertical-09.avif`, `vertical-09.webp`, `vertical-09.jpg`

3. **Mettre à jour `src/data/projects.ts`** :
   ```ts
   export const verticalProjects1: Project[] = [
     // ... ajouter une entrée :
     v('09', 'Mon nouveau projet'),
   ];
   ```
   Le helper `v()` génère automatiquement les bons chemins. Une fois les vrais posters AVIF/WebP en place, modifier les helpers pour pointer vers les bonnes extensions (cf. commentaire `TODO:` dans le fichier).

---

## Comment remplacer les placeholders

Le projet est livré avec des placeholders SVG colorés pour tester la mise en page. À remplacer :

- **`public/posters/*.svg`** → 3 vrais formats (`.avif`, `.webp`, `.jpg`) pour chaque vidéo, puis mettre à jour les chemins dans `src/data/projects.ts` (retirer le pointage `.svg` partout).
- **`public/videos/*.mp4`** → vidéos réelles (~20 Mo chacune, format adéquat).
- **`public/og-image.svg`** → image OG en JPG/PNG 1200×630.
- **`src/components/DecorBolt.astro` / `DecorCrystal.astro`** → si le client fournit ses propres SVG, remplacer le contenu inline.

---

## Customiser les couleurs

Toutes les couleurs sont exposées en CSS variables dans `src/styles/global.css` :

```css
:root {
  --color-primary: #8E3FE8;       /* violet signature */
  --color-primary-dark: #6B2BBA;
  --color-bg: #FFFFFF;
  --color-text: #0A0A0A;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
  --color-lightbox-backdrop: rgba(10, 10, 10, 0.92);
}
```

Tailwind reflète ces couleurs dans `tailwind.config.mjs` (alias `primary`, `ink`, `muted`, `line`).

---

## Notes de performance

**Règle d'or : aucun `<video>` n'est jamais chargé avant un click utilisateur.**

- Tous les phones et cards utilisent des `<picture>` posters en lazy loading (`loading="lazy"`).
- Les `<video>` de la lightbox sont en `preload="none"` ; la `src` est posée au click et retirée à la fermeture (libération mémoire via `video.removeAttribute('src') + load()`).
- Au hover, on déclenche un `<link rel="prefetch" as="video">` après 300ms d'intent prouvée — la vidéo se met en cache sans bloquer la page.
- Les fonts Google sont preconnect + chargées en parallèle. Permanent Marker en swap.
- GSAP et Lenis sont importés dynamiquement après le first paint (cf. `<script>` dans `Base.astro`).

**Ne jamais activer `autoplay` sans mute**, et **ne jamais retirer le `preload="none"`** sur les `<video>` au repos.

---

## Accessibilité

- Skip link en haut de page (`Aller au contenu principal`).
- Tous les éléments interactifs sont des `<button>` ou `<a>` avec `aria-label` explicite.
- Focus visible : outline 2px violet, offset 4px.
- Lightbox : `role="dialog"`, `aria-modal="true"`, focus trap simple (Tab/Shift+Tab), Escape ferme, focus retour sur le déclencheur.
- `prefers-reduced-motion: reduce` désactive Lenis, le custom cursor, le tilt 3D, le sticky pin, toutes les animations GSAP (via `gsap.matchMedia`).
- Burger menu mobile avec `aria-expanded`.

---

## Responsive

- `≥ 1024px` : layout maquette intégral, tous les effets actifs.
- `640 – 1024px` : grille phones 2×2, grille horizontale 2 col, sticky scrub conservé.
- `< 640px` : phones en scroll horizontal snap (un par fold), grille horizontale empilée, burger menu, custom cursor désactivé, tilt mousemove désactivé.

Tester aux 3 breakpoints — **zéro débordement horizontal** garanti par `overflow-x: hidden` sur `body` + containers contraints.

---

## Non-objectifs V1

- ❌ Pas de back-office / CMS — les projets vivent dans `src/data/projects.ts`.
- ❌ Pas de formulaire de contact (juste l'email dans le footer).
- ❌ Pas de page secondaire, pas de blog, pas de multilingue, pas de dark mode.
- ❌ Pas d'autoplay vidéo nulle part. Pas de son par défaut.
