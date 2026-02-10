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
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Jamie_4x5_a794145663.webp',
    id: 1,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
    tags: [
      { dropX: 0.15, dropY: 0.2, id: '1-1', label: 'Branding' },
      { dropX: 0.25, dropY: 0.2, id: '1-2', label: 'Architecture' },
    ],
    title: 'MOKUYA STUDIO',
  },
  {
    description:
      'An intelligent management system for design systems and color palettes.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/mr_chips_76c4f87a75.webp',
    id: 2,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Radnor_Fuel_the_Fun_Hero_1x1_db93bf5dee.webp',
    tags: [
      { dropX: 0.45, dropY: 0.2, id: '2-1', label: 'Digital Product' },
      { dropX: 0.55, dropY: 0.2, id: '2-2', label: 'SaaS' },
    ],
    title: 'ATOMLAB',
  },
  {
    description:
      'Bold brand transformation for a premium, fair-trade chocolatier.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Ding_Fall_back_header_1x1_92542c6671.webp',
    id: 3,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/mr_chips_76c4f87a75.webp',
    tags: [
      { dropX: 0.75, dropY: 0.2, id: '3-1', label: 'Branding' },
      { dropX: 0.85, dropY: 0.2, id: '3-2', label: 'Food & Beverage' },
    ],
    title: 'DIVINE CHOCOLATE',
  },
  {
    description:
      'Transforming a traditional financial service into a modern lifestyle brand.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
    id: 4,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Jamie_4x5_a794145663.webp',
    tags: [
      { dropX: 0.2, dropY: 0.4, id: '4-1', label: 'Finance' },
      { dropX: 0.3, dropY: 0.4, id: '4-2', label: 'Campaign' },
    ],
    title: 'FORD MONEY',
  },
  {
    description:
      'A digital campaign focused on fostering real connections in a virtual world.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Radnor_Fuel_the_Fun_Hero_1x1_db93bf5dee.webp',
    id: 5,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Ding_Fall_back_header_1x1_92542c6671.webp',
    tags: [
      { dropX: 0.6, dropY: 0.4, id: '5-1', label: 'Campaign' },
      { dropX: 0.7, dropY: 0.4, id: '5-2', label: 'Digital' },
    ],
    title: 'BUMBLE X LOVE',
  },
  {
    description:
      'An immersive e-commerce experience for the heritage British fragrance house.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/mr_chips_76c4f87a75.webp',
    id: 6,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
    tags: [
      { dropX: 0.15, dropY: 0.6, id: '6-1', label: 'Digital' },
      { dropX: 0.25, dropY: 0.6, id: '6-2', label: 'E-commerce' },
    ],
    title: "PENHALIGON'S",
  },
  {
    description:
      'Automated API mocking tool utilizing AI to map DTOs to realistic data.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Jamie_4x5_a794145663.webp',
    id: 7,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Radnor_Fuel_the_Fun_Hero_1x1_db93bf5dee.webp',
    tags: [
      { dropX: 0.45, dropY: 0.6, id: '7-1', label: 'Development Tool' },
      { dropX: 0.55, dropY: 0.6, id: '7-2', label: 'AI' },
    ],
    title: 'FAKER MOCK AI',
  },
  {
    description:
      'Visualizing sustainable living through interactive 3D web storytelling.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Ding_Fall_back_header_1x1_92542c6671.webp',
    id: 8,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/mr_chips_76c4f87a75.webp',
    tags: [
      { dropX: 0.75, dropY: 0.6, id: '8-1', label: 'Real Estate' },
      { dropX: 0.85, dropY: 0.6, id: '8-2', label: 'Interactive' },
    ],
    title: 'URBAN OASIS',
  },
  {
    description:
      'Experimental typography explorations using Matter.js and physics engines.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
    id: 9,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Jamie_4x5_a794145663.webp',
    tags: [
      { dropX: 0.35, dropY: 0.8, id: '9-1', label: 'Experimental' },
      { dropX: 0.45, dropY: 0.8, id: '9-2', label: 'Animation' },
    ],
    title: 'KINETIC TYPE',
  },
  {
    description:
      'A digital exhibition platform showcasing underground digital artists.',
    hoverImage:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Radnor_Fuel_the_Fun_Hero_1x1_db93bf5dee.webp',
    id: 10,
    image:
      'https://wildish.lon1.cdn.digitaloceanspaces.com/Ding_Fall_back_header_1x1_92542c6671.webp',
    tags: [
      { dropX: 0.65, dropY: 0.8, id: '10-1', label: 'Art' },
      { dropX: 0.75, dropY: 0.8, id: '10-2', label: 'Web Design' },
    ],
    title: 'NOCTURNE ARTS',
  },
];
