'use client';

import Matter from 'matter-js';
import React, { useEffect, useRef, useState } from 'react';
import ButtonItem from './ButtonItem';
import Image from 'next/image';

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

  // Quản lý Refs cho DOM
  const itemRefs = useRef<Map<string | number, HTMLElement>>(new Map());
  const engineRef = useRef(Matter.Engine.create({ enableSleeping: true }));

  // Data khởi tạo
  const [items] = useState<PhysicsItem[]>([
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
      id: 'p1',
      src: '/images/img_1.jpg',
      w: 150,
      h: 150,
      initialX: 300,
      initialY: 200, // Đổi từ -100 sang 200 để thấy ngay
      type: 'photo',
    },
    {
      id: 'p2',
      src: '/images/img_2.jpg',
      w: 200,
      h: 140,
      initialX: 700,
      initialY: 300, // Đổi từ -200 sang 300 để thấy ngay
      type: 'photo',
    },
  ]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Render, Runner, Bodies, Composite, Events, Engine } = Matter;
    const engine = engineRef.current;
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    // 1. Cấu hình Render (Dùng để debug khung vật lý)
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false, // Bật true để thấy khung xanh va chạm
      },
    });

    // 2. Tạo tường bao quanh sát mép
    const wallOptions = { isStatic: true, restitution: 0.9, friction: 0.1 };
    const wallThickness = 100;
    const walls = [
      Bodies.rectangle(
        width / 2,
        height + 50,
        width,
        wallThickness,
        wallOptions,
      ), // Sàn
      Bodies.rectangle(width / 2, -50, width, wallThickness, wallOptions), // Trần
      Bodies.rectangle(-50, height / 2, wallThickness, height, wallOptions), // Trái
      Bodies.rectangle(
        width + 50,
        height / 2,
        wallThickness,
        height,
        wallOptions,
      ), // Phải
    ];

    // 3. Tạo Physics Bodies & Map chúng với ID
    const bodiesMap = new Map<string | number, Matter.Body>();
    const physicsBodies = items.map((item) => {
      const body = Bodies.rectangle(
        item.initialX,
        item.initialY,
        item.w,
        item.h,
        {
          restitution: 0.7,
          frictionAir: 0.03,
          friction: 0.2,
          chamfer: { radius: item.type === 'button' ? 12 : 15 },
        },
      );
      bodiesMap.set(item.id, body);
      return body;
    });

    Composite.add(engine.world, [...walls, ...physicsBodies]);

    // 4. Vòng lặp đồng bộ tập trung (Mượt 60fps)
    const update = () => {
      items.forEach((item) => {
        const domEl = itemRefs.current.get(item.id);
        const body = bodiesMap.get(item.id);
        if (domEl && body) {
          const { x, y } = body.position;
          const angle = body.angle;

          // Chuyển đổi tọa độ từ Tâm (Matter) sang Góc (CSS)
          domEl.style.transform = `translate(${x - item.w / 2}px, ${y - item.h / 2}px) rotate(${angle}rad)`;
        }
      });
    };

    Events.on(engine, 'afterUpdate', update);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Events.off(engine, 'afterUpdate', update);
      Engine.clear(engine);
      Composite.clear(engine.world, false);
    };
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-slate-950 overflow-hidden select-none"
    >
      {/* Lớp Canvas debug */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
      />

      {items.map((item) => {
        // Tọa độ Inline Style ban đầu để tránh bị nhảy hình (FOUC)
        const initialStyle: React.CSSProperties = {
          width: item.w,
          height: item.h,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate(${item.initialX - item.w / 2}px, ${item.initialY - item.h / 2}px)`,
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
            style={{ ...initialStyle, borderRadius: '15px' }}
            className="overflow-hidden shadow-2xl border-2 border-white/10 bg-gray-800 will-change-transform z-20"
          >
            <Image
              src={item.src}
              width={599}
              height={599}
              alt=""
              draggable={false}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          </div>
        );
      })}
    </div>
  );
};
