'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const ProcessItem = () => {
  const images = [
    'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
    'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
    'https://wildish.lon1.cdn.digitaloceanspaces.com/racquetscase_3a449e2665.webp',
  ];
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group flex cursor-pointer items-center justify-center uppercase"
    >
      <p className="font-medium text-7xl">Our </p>

      <div className="flex items-center overflow-hidden">
        <div className="flex items-center gap-2 px-0 duration-500 group-hover:px-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              variants={{
                hover: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.1,
                    duration: 0.4,
                    ease: 'easeOut',
                  },
                  width: 'auto',
                },
                rest: { opacity: 0, scale: 0, width: 0 },
              }}
              className="overflow-hidden"
            >
              <Image
                src={src}
                width={120}
                height={120}
                alt=""
                className="h-20 w-20 shrink-0 select-none rounded-md object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <p className="font-medium text-7xl">Process</p>
    </motion.div>
  );
};
