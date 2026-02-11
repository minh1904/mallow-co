import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MarqueeItem({
  images,
  from,
  to,
}: {
  images: string[];
  from: number | string;
  to: number | string;
}) {
  return (
    <div className="my-10 flex">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
        className="flex shrink-0"
      >
        {images.map((image: string, index: number) => {
          return (
            <Image
              width={400}
              height={400}
              alt={`marqueImg${index}`}
              className="aspect-square h-96 w-96 object-fill pr-20"
              src={image}
              key={index}
            />
          );
        })}
      </motion.div>

      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
        className="flex shrink-0"
      >
        {images.map((image: string, index: number) => {
          return (
            <Image
              width={600}
              height={600}
              alt={`marqueImg${index}`}
              className="aspect-square h-96 w-96 object-fill pr-20"
              src={image}
              key={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
