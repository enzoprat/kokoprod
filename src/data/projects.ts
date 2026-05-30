export interface Slide {
  videoSrc?: string;
  poster?: string;
  label?: string;
}

export interface Packaging {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  slides: Slide[];
  duration?: number;
  direction?: 'left' | 'right';
}

const v = (file: string, label: string): Slide => ({
  videoSrc: `/videos/${file}`,
  label,
});

// 4 formats Koko Studio AI
export const packagings: Packaging[] = [
  {
    id: 'signature',
    index: '01',
    title: 'Signature de marque',
    subtitle: 'Films récurrents qui posent l\'identité',
    duration: 40,
    direction: 'left',
    slides: [
      v('corona.mp4', 'Corona'),
      v('bpm-race.mp4', 'BPM Race'),
      v('belle-aprem.mp4', 'Belle Aprem'),
      v('coronagym.mp4', 'Coronagym'),
      v('auguste.mp4', 'Auguste'),
      v('bagueraa.mp4', 'Bagueraa'),
    ],
  },
  {
    id: 'produits',
    index: '02',
    title: 'Publicités produits',
    subtitle: 'Le produit au centre, raconté autrement',
    duration: 38,
    direction: 'right',
    slides: [
      v('cartier.mp4', 'Cartier'),
      v('coca.mp4', 'Coca Réunion'),
      v('isautier.mp4', 'Isautier'),
      v('toblerone.mp4', 'Toblerone'),
      v('rebelle.mp4', 'Rebelle'),
      v('burger-king.mp4', 'Burger King'),
    ],
  },
  {
    id: 'fooh',
    index: '03',
    title: 'FOOH',
    subtitle: 'Fake Out Of Home, l\'IA habille la rue',
    duration: 36,
    direction: 'left',
    slides: [
      v('fooh-shrek.mp4', 'FOOH Shrek'),
      v('fooh-1.mp4', 'FOOH 01'),
      v('fooh-2.mp4', 'FOOH 02'),
      v('fooh-3.mp4', 'FOOH 03'),
      v('fooh-4.mp4', 'FOOH 04'),
      v('fooh-5.mp4', 'FOOH 05'),
    ],
  },
  {
    id: 'cinema',
    index: '04',
    title: 'Teaser cinéma',
    subtitle: 'Univers de fiction, blockbuster augmenté',
    duration: 42,
    direction: 'right',
    slides: [
      v('cine-simpson.mp4', 'Simpson'),
      v('cine-shrek.mp4', 'Shrek'),
      v('cine-mythos.mp4', 'Mythos'),
      v('cine-techno.mp4', 'Festival Techno'),
      v('cine-maldives.mp4', 'Maldives'),
      v('cine-buggy.mp4', 'Buggy'),
    ],
  },
];
