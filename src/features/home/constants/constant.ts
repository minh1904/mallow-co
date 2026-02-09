import type { PhysicsItem, Project } from '../types/modal';

export const images = [...Array(10)].map((_, i) => `/images/img_${i + 1}.jpg`);

export const getItems = (): PhysicsItem[] => {
  if (typeof window === 'undefined') return [];

  const photoY = 0.2;
  const mainButtonY = 0.5;
  const smallButtonY = 0.8;

  return [
    {
      className: 'bg-black text-white',
      dropX: 0.4,
      dropY: smallButtonY,
      id: 'btn-small-1',
      label: '1',
      type: 'button',
    },
    {
      className: 'bg-black text-white',
      dropX: 0.5,
      dropY: smallButtonY,
      id: 'btn-small-2',
      label: '2',
      type: 'button',
    },
    {
      className: 'bg-black text-white',
      dropX: 0.6,
      dropY: smallButtonY,
      id: 'btn-small-3',
      label: '3',
      type: 'button',
    },

    {
      className: 'bg-black text-white',
      dropX: 0.2,
      dropY: mainButtonY,
      id: 'btn-1',
      label: "LET'S",
      type: 'button',
    },
    {
      className: 'bg-primary text-black',
      dropX: 0.4,
      dropY: mainButtonY,
      id: 'btn-2',
      label: 'SHAKE',
      type: 'button',
    },
    {
      className: 'bg-primary text-black',
      dropX: 0.6,
      dropY: mainButtonY,
      id: 'btn-3',
      label: 'THINGS',
      type: 'button',
    },
    {
      className: 'bg-black text-white',
      dropX: 0.8,
      dropY: mainButtonY,
      id: 'btn-4',
      label: 'UP',
      type: 'button',
    },

    {
      className: 'bg-[#FFC0CB]',
      dropX: 0.1,
      dropY: photoY,
      id: 'photo-1',
      src: 'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
      type: 'photo',
    },
    {
      className: 'bg-[#8BC34A]',
      dropX: 0.3,
      dropY: photoY,
      id: 'photo-2',
      src: 'https://wildish.lon1.cdn.digitaloceanspaces.com/Radnor_Fuel_the_Fun_Hero_1x1_db93bf5dee.webp',
      type: 'photo',
    },
    {
      dropX: 0.5,
      dropY: photoY,
      id: 'photo-3',
      src: 'https://wildish.lon1.cdn.digitaloceanspaces.com/Ding_Fall_back_header_1x1_92542c6671.webp',
      type: 'photo',
    },
    {
      dropX: 0.7,
      dropY: photoY,
      id: 'photo-4',
      src: 'https://wildish.lon1.cdn.digitaloceanspaces.com/mr_chips_76c4f87a75.webp',
      type: 'photo',
    },
    {
      dropX: 0.9,
      dropY: photoY,
      id: 'photo-5',
      src: 'https://wildish.lon1.cdn.digitaloceanspaces.com/Jamie_4x5_a794145663.webp',
      type: 'photo',
    },
  ];
};

export const projects: Project[] = [
  {
    description:
      'Minimalist architectural design rooted in Japanese Wabi-sabi philosophy.',
    hoverImage: '/images/mokuya-hover.jpg',
    id: 1,
    image: '/images/mokuya-main.jpg',
    tags: ['Branding', 'Architecture'],
    title: 'MOKUYA STUDIO',
  },
  {
    description:
      'An intelligent management system for design systems and color palettes.',
    hoverImage: '/images/atomlab-hover.jpg',
    id: 2,
    image: '/images/atomlab-main.jpg',
    tags: ['Digital Product', 'SaaS'],
    title: 'ATOMLAB',
  },
  {
    description:
      'Bold brand transformation for a premium, fair-trade chocolatier.',
    hoverImage: '/images/divine-hover.jpg',
    id: 3,
    image: '/images/divine-main.jpg',
    tags: ['Branding', 'Food & Beverage'],
    title: 'DIVINE CHOCOLATE',
  },
  {
    description:
      'Transforming a traditional financial service into a modern lifestyle brand.',
    hoverImage: '/images/ford-hover.jpg',
    id: 4,
    image: '/images/ford-main.jpg',
    tags: ['Finance', 'Campaign'],
    title: 'FORD MONEY',
  },
  {
    description:
      'A digital campaign focused on fostering real connections in a virtual world.',
    hoverImage: '/images/bumble-hover.jpg',
    id: 5,
    image: '/images/bumble-main.jpg',
    tags: ['Campaign', 'Digital'],
    title: 'BUMBLE X LOVE',
  },
  {
    description:
      'An immersive e-commerce experience for the heritage British fragrance house.',
    hoverImage: '/images/penhaligons-hover.jpg',
    id: 6,
    image: '/images/penhaligons-main.jpg',
    tags: ['Digital', 'E-commerce'],
    title: "PENHALIGON'S",
  },
  {
    description:
      'Automated API mocking tool utilizing AI to map DTOs to realistic data.',
    hoverImage: '/images/faker-hover.jpg',
    id: 7,
    image: '/images/faker-main.jpg',
    tags: ['Development Tool', 'AI'],
    title: 'FAKER MOCK AI',
  },
  {
    description:
      'Visualizing sustainable living through interactive 3D web storytelling.',
    hoverImage: '/images/urban-hover.jpg',
    id: 8,
    image: '/images/urban-main.jpg',
    tags: ['Real Estate', 'Interactive'],
    title: 'URBAN OASIS',
  },
  {
    description:
      'Experimental typography explorations using Matter.js and physics engines.',
    hoverImage: '/images/kinetic-hover.jpg',
    id: 9,
    image: '/images/kinetic-main.jpg',
    tags: ['Experimental', 'Animation'],
    title: 'KINETIC TYPE',
  },
  {
    description:
      'A digital exhibition platform showcasing underground digital artists.',
    hoverImage: '/images/nocturne-hover.jpg',
    id: 10,
    image: '/images/nocturne-main.jpg',
    tags: ['Art', 'Web Design'],
    title: 'NOCTURNE ARTS',
  },
];
export const getProjectItems = () =>
  projects.map((p) => ({
    ...p,
    id: p.id.toString(),
    label: p.title,
  }));
