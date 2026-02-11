'use client';

import { useMemo, useRef } from 'react';
import { getItems } from '../../constants/constant';
import { useMatterPhysics } from '../../hooks/useMatterPhysics';
import { HeroItem } from './HeroItem';
import { HeroText } from './HeroText';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const items = useMemo(() => getItems(), []);
  const { itemRefs } = useMatterPhysics(containerRef, canvasRef, items);

  return (
    <section className="relative w-full overflow-visible">
      <div
        ref={containerRef}
        className="relative z-10 h-svh w-full cursor-pointer overflow-hidden bg-white"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-0" />
        <HeroText />
        {items.map((item) => (
          <HeroItem
            key={item.id}
            item={item}
            itemRef={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
          />
        ))}
      </div>
    </section>
  );
};
