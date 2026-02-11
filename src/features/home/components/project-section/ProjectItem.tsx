'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useMatterPhysics } from '@/features/home/hooks/useMatterPhysics';
import type { Project } from '@/features/home/types/modal';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  prj: Project;
}

export const ProjectItem = ({ data }: { data: Project[] }) => {
  return (
    <section className="mt-10 grid grid-cols-12 gap-x-15 gap-y-32 px-6 py-20 md:px-16">
      {data.slice(0, 6).map((prj, index) => {
        const isBig = index % 4 === 0 || index % 4 === 3;

        const gridClass = cn(
          'col-span-12',
          index % 4 === 0 && 'md:col-span-7',
          index % 4 === 1 && 'self-center md:col-span-5 md:col-start-8',
          index % 4 === 2 && 'self-center md:col-span-5',
          index % 4 === 3 && 'md:col-span-7 md:col-start-6',
        );

        return (
          <div key={prj.id} className={gridClass}>
            {isBig ? <ProjectCardBig prj={prj} /> : <ProjectCard prj={prj} />}
          </div>
        );
      })}
    </section>
  );
};

export const ProjectCard = ({ prj }: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { itemRefs } = useMatterPhysics(containerRef, canvasRef, prj.tags);

  return (
    <div className="flex flex-col">
      <div
        ref={containerRef}
        className="relative aspect-square w-full overflow-hidden rounded-sm"
      >
        <Image
          src={prj.image}
          alt={prj.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0"
        />

        {prj.tags.map((tag) => (
          <span
            key={tag.id}
            ref={(el) => {
              if (el) itemRefs.current.set(tag.id, el);
              else itemRefs.current.delete(tag.id);
            }}
            className={cn(
              'absolute z-20 select-none px-3 py-1 text-md uppercase tracking-tight',
              'rounded-md bg-white/80 backdrop-blur-md dark:bg-black/70',
              'cursor-grab active:cursor-grabbing',
            )}
            style={{ visibility: 'hidden' }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-medium text-4xl uppercase leading-tight tracking-tighter">
          {prj.title}
        </h3>
        <p className="mt-3 max-w-md text-gray-500 text-sm leading-relaxed">
          {prj.description}
        </p>
      </div>
    </div>
  );
};

export const ProjectCardBig = ({ prj }: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { itemRefs } = useMatterPhysics(containerRef, canvasRef, prj.tags);

  return (
    <div className="flex flex-col">
      <div
        ref={containerRef}
        className="relative mt-15 aspect-video w-full overflow-hidden rounded-sm"
      >
        <Image
          src={prj.image}
          alt={prj.title}
          fill
          priority
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0"
        />

        {prj.tags.map((tag) => (
          <span
            key={tag.id}
            ref={(el) => {
              if (el) itemRefs.current.set(tag.id, el);
              else itemRefs.current.delete(tag.id);
            }}
            className={cn(
              'absolute z-20 select-none px-4 py-1.5 text-md uppercase tracking-widest',
              'rounded-md bg-white/90 backdrop-blur-lg',
              'cursor-grab active:cursor-grabbing',
            )}
            style={{ visibility: 'hidden' }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-medium text-4xl uppercase leading-tight tracking-tighter">
          {prj.title}
        </h3>
        <p className="mt-3 max-w-md text-gray-500 text-sm leading-relaxed">
          {prj.description}
        </p>
      </div>
    </div>
  );
};
