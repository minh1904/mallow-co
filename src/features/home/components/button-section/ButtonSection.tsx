'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ButtonSectionItems } from '../../constants/constant';
import { useMatterPhysics } from '../../hooks/useMatterPhysics';

export const ButtonSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { itemRefs } = useMatterPhysics(
    containerRef,
    canvasRef,
    ButtonSectionItems,
  );

  return (
    <section className="relative h-128 w-full overflow-visible">
      <div
        ref={containerRef}
        className="relative z-10 h-full w-full cursor-pointer overflow-hidden bg-white"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-0" />

        {ButtonSectionItems.map((item) => (
          <span
            key={item.id}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            className={cn(
              'absolute z-20 select-none rounded-md font-medium uppercase tracking-tighter',
              'px-4 py-2 text-2xl md:px-6 md:py-4 md:text-5xl lg:px-8 lg:text-7xl',
              item.className,
            )}
            style={{ visibility: 'hidden' }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
};
