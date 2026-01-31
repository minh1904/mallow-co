'use client';

import Matter from 'matter-js';
import { useEffect, useRef } from 'react';

interface PhysicsItem {
  id: string | number;
  w: number;
  h: number;
  initialX: number;
  initialY: number;
}

export const useMatterPhysics = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  items: PhysicsItem[],
) => {
  const itemRefs = useRef<Map<string | number, HTMLElement>>(new Map());
  const engineRef = useRef(Matter.Engine.create({ enableSleeping: true }));

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Render, Runner, Bodies, Composite, Events, Engine } = Matter;
    const engine = engineRef.current;
    const { offsetWidth: width, offsetHeight: height } = containerRef.current;

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: { width, height, background: 'transparent', wireframes: false },
    });

    // Tạo tường
    const wallOptions = { isStatic: true, restitution: 0.9 };
    const walls = [
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
      Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
      Bodies.rectangle(-50, height / 2, 100, height, wallOptions),
      Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions),
    ];

    // Tạo Bodies
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
          chamfer: { radius: 12 },
        },
      );
      bodiesMap.set(item.id, body);
      return body;
    });

    Composite.add(engine.world, [...walls, ...physicsBodies]);

    const update = () => {
      items.forEach((item) => {
        const domEl = itemRefs.current.get(item.id);
        const body = bodiesMap.get(item.id);
        if (domEl && body) {
          const { x, y } = body.position;
          const angle = body.angle;
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

  return { itemRefs };
};
