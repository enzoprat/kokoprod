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

export const packagings: Packaging[] = [
  {
    id: 'signature',
    index: '01',
    title: 'Signature de marque',
    subtitle: 'Reels editoriaux récurrents',
    duration: 38,
    direction: 'left',
    slides: [
      v('ricard.mp4', 'Ricard'),
      v('koko-version.mp4', 'koko version'),
      v('supreme-pizza.mp4', 'Supreme pizza'),
      v('corona.mp4', 'Corona'),
      v('simpson-teaser.mp4', 'Simpson teaser'),
    ],
  },
  {
    id: 'lancement',
    index: '02',
    title: 'Lancement',
    subtitle: 'Teasers, drops, prélancements',
    duration: 42,
    direction: 'right',
    slides: [
      v('coronagym-youngla.mp4', 'Coronagym × YoungLA'),
      v('hf-01.mp4', 'HF clip 01'),
      v('reel-01.mp4', 'Reel 01'),
      v('06.mp4', 'Clip 06'),
      v('07.mp4', 'Clip 07'),
    ],
  },
  {
    id: 'ugc',
    index: '03',
    title: 'UGC augmenté',
    subtitle: 'Le réel, amplifié par l’IA',
    duration: 36,
    direction: 'left',
    slides: [
      v('clip-0224.mp4', 'Clip 0224'),
      v('hf-02.mp4', 'HF clip 02'),
      v('koko-version.mp4', 'koko version'),
      v('ricard.mp4', 'Ricard'),
      v('supreme-pizza.mp4', 'Supreme pizza'),
    ],
  },
  {
    id: 'full-ia',
    index: '04',
    title: 'Concept full IA',
    subtitle: 'Mondes, objets, scènes inédits',
    duration: 40,
    direction: 'right',
    slides: [
      v('hf-01.mp4', 'HF clip 01'),
      v('hf-02.mp4', 'HF clip 02'),
      v('simpson-teaser.mp4', 'Simpson teaser'),
      v('reel-01.mp4', 'Reel 01'),
      v('corona.mp4', 'Corona'),
    ],
  },
  {
    id: 'saisonnier',
    index: '05',
    title: 'Campagne saisonnière',
    subtitle: 'Capsules thématiques, séries courtes',
    duration: 44,
    direction: 'left',
    slides: [
      v('coronagym-youngla.mp4', 'Coronagym × YoungLA'),
      v('07.mp4', 'Clip 07'),
      v('06.mp4', 'Clip 06'),
      v('clip-0224.mp4', 'Clip 0224'),
      v('koko-version.mp4', 'koko version'),
    ],
  },
];
