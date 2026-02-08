import type { PhysicsItem } from './types/modal';

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
