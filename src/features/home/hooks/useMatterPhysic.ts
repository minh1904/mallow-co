'use client';

import Matter from 'matter-js';
import { useEffect, useRef } from 'react';

interface PhysicsItem {
  id: string | number;
  w?: number;
  h?: number;
}

export const useMatterPhysics = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  items: PhysicsItem[],
) => {
  const itemRefs = useRef<Map<string | number, HTMLElement>>(new Map());
  const bodiesMap = useRef<Map<string | number, Matter.Body>>(new Map());
  const sizesMap = useRef<Map<string | number, { w: number; h: number }>>(
    new Map(),
  ); // Cache sizes
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  const config = {
    gravity: { x: 0, y: 1, scale: 0.001 },
    restitution: 0.5,
    friction: 0.1,
    frictionAir: 0.01,
    density: 0.001,
    wallThickness: 50,
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
      Body,
    } = Matter;

    // 1. Khởi tạo Engine & World
    const engine = Engine.create({
      gravity: config.gravity,
      constraintIterations: 10,
      positionIterations: 10,
    });
    engineRef.current = engine;

    const containerRect = containerRef.current.getBoundingClientRect();
    const { width, height } = containerRect;

    // 2. Render (Canvas trong suốt)
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      },
    });
    renderRef.current = render;

    // 3. Tạo tường
    const wallOptions = { isStatic: true, restitution: 0.4 };
    const walls = [
      // Sàn
      Bodies.rectangle(
        width / 2,
        height + config.wallThickness / 2,
        width,
        config.wallThickness,
        wallOptions,
      ),
      // Trái
      Bodies.rectangle(
        -config.wallThickness / 2,
        height / 2,
        config.wallThickness,
        height,
        wallOptions,
      ),
      // Phải
      Bodies.rectangle(
        width + config.wallThickness / 2,
        height / 2,
        config.wallThickness,
        height,
        wallOptions,
      ),
    ];
    Composite.add(engine.world, walls);

    // Tường trên xuất hiện sau 3s
    const topWallTimeout = setTimeout(() => {
      const topWall = Bodies.rectangle(
        width / 2,
        -config.wallThickness / 2,
        width,
        config.wallThickness,
        wallOptions,
      );
      Composite.add(engine.world, topWall);
    }, 3000);

    // 4. Tạo vật thể vật lý từ DOM Elements
    items.forEach((item, index) => {
      const domEl = itemRefs.current.get(item.id);
      if (!domEl) return;

      // Read size from DOM if not provided in data
      const rect = domEl.getBoundingClientRect();
      const itemWidth = item.w ?? rect.width;
      const itemHeight = item.h ?? rect.height;

      // Skip if size is invalid
      if (itemWidth === 0 || itemHeight === 0) {
        console.warn(
          `Item ${item.id} has invalid size: ${itemWidth}x${itemHeight}`,
        );
        return;
      }

      // Cache size for consistent rendering
      sizesMap.current.set(item.id, { w: itemWidth, h: itemHeight });

      // Vị trí khởi đầu ngẫu nhiên theo chiều ngang
      const startX = Math.random() * (width - itemWidth) + itemWidth / 2;
      const startY = -200 - index * 150; // Rơi lần lượt từ trên xuống

      const body = Bodies.rectangle(startX, startY, itemWidth, itemHeight, {
        restitution: config.restitution,
        friction: config.friction,
        frictionAir: config.frictionAir,
        density: config.density,
      });

      // Góc xoay ngẫu nhiên nhẹ
      Body.setAngle(body, (Math.random() - 0.5) * 0.5);

      // Lưu inertia mặc định để khôi phục sau khi thả
      (body as any).defaultInertia = body.inertia;

      bodiesMap.current.set(item.id, body);
      Composite.add(engine.world, body);
    });

    // 5. Xử lý kéo thả
    const mouse = Mouse.create(containerRef.current);

    // Fix lỗi scroll trên mobile/desktop
    mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel);
    mouse.element.removeEventListener(
      'DOMMouseScroll',
      (mouse as any).mousewheel,
    );
    mouse.element.removeEventListener('touchmove', (mouse as any).mousemove);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);

    // Vô hiệu hóa xoay khi đang kéo
    Events.on(mouseConstraint, 'startdrag', (event) => {
      Body.setInertia(event.body, Infinity);
    });

    Events.on(mouseConstraint, 'enddrag', (event) => {
      const defaultInertia = (event.body as any).defaultInertia || 1000;
      Body.setInertia(event.body, defaultInertia);
    });

    // 6. Hàm Update: Đồng bộ Matter -> DOM
    let animationId: number;
    const update = () => {
      items.forEach((item) => {
        const domEl = itemRefs.current.get(item.id);
        const body = bodiesMap.current.get(item.id);
        const size = sizesMap.current.get(item.id); // Use cached size

        if (domEl && body && size) {
          const { x, y } = body.position;
          const angle = body.angle;

          // Transform với GPU acceleration using cached size
          domEl.style.transform = `translate3d(${x - size.w / 2}px, ${y - size.h / 2}px, 0) rotate(${angle}rad)`;
          domEl.style.visibility = 'visible';
        }
      });
      animationId = requestAnimationFrame(update);
    };

    // 7. Khởi chạy
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);
    animationId = requestAnimationFrame(update);

    // 8. Cleanup
    return () => {
      clearTimeout(topWallTimeout);
      cancelAnimationFrame(animationId);

      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
      if (renderRef.current) {
        Render.stop(renderRef.current);
      }
      if (engineRef.current) {
        Engine.clear(engineRef.current);
        Composite.clear(engineRef.current.world, false);
      }

      bodiesMap.current.clear();
      sizesMap.current.clear(); // Clear cached sizes
    };
  }, [items]);

  return { itemRefs };
};
