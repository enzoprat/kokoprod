import Lenis from 'lenis';

export function initMotion() {
  // ---- Smooth scroll (Lenis) ----
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Anchor links → lenis scrollTo
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -40 });
    });
  });

  // ---- Reveal on intersect ----
  const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  }

  // ---- Marquee speed binding (logos / mot géant) ----
  // Pause au survol géré en CSS.

  // ---- Click vidéo → fullscreen ----
  // Sur iOS Safari : video.webkitEnterFullscreen() ouvre le player natif
  // (avec contrôles iOS, son, scrubbing). C'est ce que l'utilisateur attend.
  // Ailleurs : Fullscreen API standard.
  // Dans tous les cas on dé-mute pendant le fullscreen, puis on re-mute en sortie.
  // Tous les phones cliquables : carousels des formats + mockup mobile du hero.
  // (Pas la grappe desktop du hero qui a pointer-events:none, purement décorative.)
  const phones = document.querySelectorAll<HTMLElement>(
    '.carousel .phone, .mobile-tile .phone'
  );
  phones.forEach((phone) => {
    const video = phone.querySelector('video');
    if (!video) return;

    phone.style.cursor = 'pointer';
    phone.setAttribute('role', 'button');
    phone.setAttribute('tabindex', '0');
    phone.setAttribute('aria-label', 'Lire la vidéo en plein écran');

    const goFullscreen = () => {
      // Son ON pour le fullscreen
      video.muted = false;
      video.controls = true;
      // S'assurer qu'on lit
      video.play().catch(() => {});

      // iOS Safari : API spécifique au tag <video>
      const v = video as HTMLVideoElement & {
        webkitEnterFullscreen?: () => void;
      };
      if (typeof v.webkitEnterFullscreen === 'function') {
        v.webkitEnterFullscreen();
        return;
      }

      // Standard Fullscreen API
      if (typeof video.requestFullscreen === 'function') {
        video.requestFullscreen().catch(() => {});
        return;
      }

      // Webkit non-iOS (Safari desktop)
      const wv = video as HTMLVideoElement & {
        webkitRequestFullscreen?: () => Promise<void>;
      };
      if (typeof wv.webkitRequestFullscreen === 'function') {
        wv.webkitRequestFullscreen();
      }
    };

    phone.addEventListener('click', goFullscreen);
    phone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goFullscreen();
      }
    });

    // Re-mute quand on sort du fullscreen iOS (event spécifique)
    video.addEventListener('webkitendfullscreen', () => {
      video.muted = true;
      video.controls = false;
    });
  });

  // Standard fullscreen exit handler (Chrome, Firefox, Safari desktop)
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      document.querySelectorAll<HTMLVideoElement>('.carousel video').forEach((v) => {
        v.muted = true;
        v.controls = false;
      });
    }
  });

  // ---- Pause des <video> hors viewport (perf) ----
  // Avec ~55 vidéos sur la page, seules les ~10 visibles à un instant t
  // doivent vraiment décoder. Les autres : pause + freeze.
  const videos = document.querySelectorAll<HTMLVideoElement>('video');
  if (videos.length && 'IntersectionObserver' in window) {
    const vIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            // Lecture seulement quand visible
            v.play().catch(() => {
              /* iOS bloque parfois — ignore silencieusement */
            });
          } else {
            v.pause();
          }
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );
    videos.forEach((v) => {
      // On laisse l'autoplay HTML s'occuper du premier play,
      // l'observer prend ensuite le relais.
      vIO.observe(v);
    });
  }
}
