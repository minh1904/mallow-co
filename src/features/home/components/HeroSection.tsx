'use client';

import React, { useRef, useMemo } from 'react';
import ButtonItem from './ButtonItem';
import Image from 'next/image';
import { useMatterPhysics } from '../hooks/useMatterPhysic';

interface PhysicsItem {
  id: string | number;
  label?: string;
  src?: string;
  w: number;
  h: number;
  initialX: number;
  initialY: number;
  type: 'button' | 'photo';
}

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sử dụng useMemo để tránh tạo lại items mỗi lần render
  const items = useMemo<PhysicsItem[]>(
    () => [
      // Buttons
      {
        id: 1,
        label: 'Work',
        w: 140,
        h: 50,
        initialX: 200,
        initialY: 100,
        type: 'button',
      },
      {
        id: 2,
        label: 'Creative',
        w: 160,
        h: 50,
        initialX: 400,
        initialY: 150,
        type: 'button',
      },
      {
        id: 3,
        label: 'Next.js',
        w: 120,
        h: 50,
        initialX: 600,
        initialY: 100,
        type: 'button',
      },
      {
        id: 4,
        label: 'React',
        w: 120,
        h: 50,
        initialX: 300,
        initialY: 250,
        type: 'button',
      },
      {
        id: 5,
        label: 'TypeScript',
        w: 140,
        h: 50,
        initialX: 500,
        initialY: 300,
        type: 'button',
      },
      {
        id: 6,
        label: 'Tailwind',
        w: 130,
        h: 50,
        initialX: 700,
        initialY: 200,
        type: 'button',
      },
      {
        id: 7,
        label: 'Matter.js',
        w: 150,
        h: 50,
        initialX: 250,
        initialY: 350,
        type: 'button',
      },

      // Photos
      {
        id: 'p1',
        src: '/images/img_1.jpg',
        w: 150,
        h: 150,
        initialX: 300,
        initialY: -100,
        type: 'photo',
      },
      {
        id: 'p2',
        src: '/images/img_2.jpg',
        w: 200,
        h: 140,
        initialX: 700,
        initialY: -200,
        type: 'photo',
      },
      {
        id: 'p3',
        src: '/images/img_1.jpg',
        w: 150,
        h: 150,
        initialX: 500,
        initialY: -300,
        type: 'photo',
      },
      {
        id: 'p4',
        src: '/images/img_2.jpg',
        w: 200,
        h: 140,
        initialX: 400,
        initialY: -400,
        type: 'photo',
      },
      {
        id: 'p5',
        src: '/images/img_1.jpg',
        w: 150,
        h: 150,
        initialX: 600,
        initialY: -500,
        type: 'photo',
      },
      {
        id: 'p6',
        src: '/images/img_2.jpg',
        w: 200,
        h: 140,
        initialX: 300,
        initialY: -600,
        type: 'photo',
      },
      {
        id: 'p7',
        src: '/images/img_1.jpg',
        w: 150,
        h: 150,
        initialX: 550,
        initialY: -700,
        type: 'photo',
      },
      {
        id: 'p8',
        src: '/images/img_2.jpg',
        w: 200,
        h: 140,
        initialX: 350,
        initialY: -800,
        type: 'photo',
      },
      {
        id: 'p9',
        src: '/images/img_1.jpg',
        w: 150,
        h: 150,
        initialX: 450,
        initialY: -900,
        type: 'photo',
      },
      {
        id: 'p10',
        src: '/images/img_2.jpg',
        w: 200,
        h: 140,
        initialX: 650,
        initialY: -1000,
        type: 'photo',
      },
    ],
    [],
  );

  const { itemRefs } = useMatterPhysics(containerRef, canvasRef, items);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-slate-950 overflow-hidden select-none"
    >
      {/* Canvas debug layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
      />

      {/* Physics items */}
      {items.map((item) => {
        const initialStyle: React.CSSProperties = {
          width: item.w,
          height: item.h,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate(${item.initialX - item.w / 2}px, ${item.initialY - item.h / 2}px)`,
          visibility: 'hidden', // Ẩn ban đầu để tránh nhảy hình
        };

        if (item.type === 'button') {
          return (
            <ButtonItem
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el);
                else itemRefs.current.delete(item.id);
              }}
              style={initialStyle}
            >
              {item.label}
            </ButtonItem>
          );
        }

        return (
          <div
            key={item.id}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            style={initialStyle}
            className="overflow-hidden shadow-2xl border-2 border-white/10 bg-gray-800 will-change-transform z-20 rounded-[15px]"
          >
            <Image
              src={item.src ?? ''}
              width={item.w}
              height={item.h}
              alt=""
              draggable={false}
              className="w-full h-full object-cover pointer-events-none select-none"
              priority={item.id === 'p1' || item.id === 'p2'} // Priority cho 2 ảnh đầu
            />
          </div>
        );
      })}
    </div>
  );
};
