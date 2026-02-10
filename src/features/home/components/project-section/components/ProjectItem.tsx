'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useMatterPhysics } from '@/features/home/hooks/useMatterPhysics';
import type { Project } from '@/features/home/types/modal';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  prj: Project;
}
export const ProjectCard = ({ prj }: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { itemRefs } = useMatterPhysics(containerRef, canvasRef, prj.tags);

  return (
    <div className="group flex flex-col">
      <div
        ref={containerRef}
        className="relative h-72 w-96 overflow-hidden rounded-xl bg-gray-100 shadow-inner"
      >
        <Image
          src={prj.image}
          alt={prj.title}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          priority={false}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10"
        />

        {prj.tags.map((tag) => (
          <span
            key={tag.id}
            ref={(el) => {
              if (el) itemRefs.current.set(tag.id, el);
              else itemRefs.current.delete(tag.id);
            }}
            className={cn(
              'absolute z-20 select-none px-3 py-1 font-bold text-[10px] uppercase tracking-tight',
              'rounded-xs bg-white/70 backdrop-blur-xs dark:bg-black/70',
              'cursor-grab active:cursor-grabbing',
            )}
            style={{ visibility: 'hidden' }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-black text-sm uppercase leading-none">
          {prj.title}
        </h3>
        <p className="line-clamp-2 max-w-96 text-gray-500 text-xs">
          {prj.description}
        </p>
      </div>
    </div>
  );
};

export const ProjectItem = ({ data }: { data: Project[] }) => {
  return (
    <div className="flex flex-wrap justify-center gap-10 p-10">
      {data.map((prj) => (
        <ProjectCard key={prj.id} prj={prj} />
      ))}
    </div>
  );
};
