'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { cn } from '@/lib/utils';
import TextItem from './TextItem';

const ITEMS = [
  { id: 'item-1', text: 'Creative', color: 'bg-white text-black' },
  { id: 'item-2', text: 'Studio', color: 'bg-primary' },
  { id: 'item-3', text: '2026', color: 'bg-black text-white' },
];

export const HeroSection = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);

  // 1. Theo dõi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      if (boxRef.current) {
        setDimensions({
          width: boxRef.current.clientWidth,
          height: boxRef.current.clientHeight,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Khởi tạo vật lý Matter.js
  useEffect(() => {
    if (dimensions.width === 0 || !boxRef.current) return;

    const {
      Engine,
      Render,
      Composite,
      Bodies,
      Runner,
      Events,
      Mouse,
      MouseConstraint,
    } = Matter;
    const { width, height } = dimensions;

    // Tạo Engine & World
    const engine = Engine.create({ gravity: { x: 0, y: 1 } });

    // Tạo Runner (vòng lặp update)
    const runner = Runner.create();

    // TẠO TƯỜNG VÔ HÌNH (Dày 100px để vật thể không bị văng ra ngoài)
    const wallThick = 100;
    const ground = Bodies.rectangle(
      width / 2,
      height + wallThick / 2,
      width,
      wallThick,
      { isStatic: true },
    );
    const leftWall = Bodies.rectangle(
      -wallThick / 2,
      height / 2,
      wallThick,
      height,
      { isStatic: true },
    );
    const rightWall = Bodies.rectangle(
      width + wallThick / 2,
      height / 2,
      wallThick,
      height,
      { isStatic: true },
    );

    // ĐO VÀ TẠO VẬT THỂ CHO TỪNG BUTTON
    const bodiesData: { body: Matter.Body; element: HTMLElement }[] = [];

    ITEMS.forEach((item, index) => {
      const element = document.getElementById(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();

        // Tạo Body khớp chính xác với size thực tế của Button
        const body = Bodies.rectangle(
          width / 2 + (index - 1) * 100, // X: Rơi lệch nhau chút
          -200 * (index + 1), // Y: Rơi từ trên cao xuống
          rect.width,
          rect.height,
          {
            restitution: 0.6, // Độ nảy
            friction: 0.1,
            chamfer: { radius: 20 }, // Bo góc vật lý
          },
        );

        bodiesData.push({ body, element });
      }
    });

    // Thêm tương tác Chuột (Cực kỳ quan trọng cho Creative Site)
    const mouse = Mouse.create(boxRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    // Thêm tất cả vào World
    Composite.add(engine.world, [
      ground,
      leftWall,
      rightWall,
      mouseConstraint,
      ...bodiesData.map((d) => d.body),
    ]);

    // ĐỒNG BỘ HÓA (Sync Matter.js -> DOM)
    Events.on(engine, 'afterUpdate', () => {
      bodiesData.forEach(({ body, element }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        // Dùng translate -50% -50% để tâm của HTML khớp với tâm của Body
        element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad) translate(-50%, -50%)`;
      });
      // Hiện UI sau khi frame đầu tiên đã tính toán xong vị trí
      setIsReady(true);
    });

    Runner.run(runner, engine);

    // Cleanup khi component unmount hoặc resize
    return () => {
      Runner.stop(runner);
      Engine.clear(engine);
      Composite.clear(engine.world, false);
    };
  }, [dimensions]);

  return (
    <div
      ref={boxRef}
      className="relative w-full h-screen overflow-hidden bg-white select-none touch-none"
    >
      {/* 3. Render HTML Elements */}
      {ITEMS.map((item) => (
        <div
          key={item.id}
          id={item.id}
          // opacity-0 lúc đầu để tránh nút bị "nháy" ở góc màn hình
          className={cn(
            'absolute top-0 left-0 will-change-transform',
            isReady ? 'opacity-100' : 'opacity-0',
          )}
          style={{ position: 'absolute' }}
        >
          <TextItem className={item.color}>{item.text}</TextItem>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-10">
        <h1 className="text-[20vw] font-bold uppercase">Mallow</h1>
      </div>
    </div>
  );
};
