'use client';

import MarqueeItem from './MarqueItem';

export const BrandSection = () => {
  const images = [
    'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
    'https://wildish.lon1.cdn.digitaloceanspaces.com/Radnor_Fuel_the_Fun_Hero_1x1_db93bf5dee.webp',
    'https://wildish.lon1.cdn.digitaloceanspaces.com/Ding_Fall_back_header_1x1_92542c6671.webp',
    'https://wildish.lon1.cdn.digitaloceanspaces.com/mr_chips_76c4f87a75.webp',
    'https://wildish.lon1.cdn.digitaloceanspaces.com/Jamie_4x5_a794145663.webp',
  ];
  return (
    <div className="flex flex-col overflow-x-hidden">
      <p className="mx-auto max-w-5xl pt-30 text-center font-medium text-2xl">
        We&apos;ve created for:
      </p>
      <MarqueeItem images={images} from="0" to="-100%" />
    </div>
  );
};
