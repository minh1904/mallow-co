import Matter, { type Mouse } from 'matter-js';
import { useEffect, useRef } from 'react';

interface PhysicsItem {
  id: string | number;
  w?: number;
  h?: number;
  dropX?: number;
  dropY?: number;
}

interface ExtendedMouse extends Mouse {
  mousewheel: EventListener;
}

const config = {
  density: 0.002,
  friction: 0.15,
  frictionAir: 0.01,
  gravity: { scale: 0.001, x: 0, y: 1 },
  mouseStiffness: 0.6,
  restitution: 0.7,
  wallThickness: 200,
};

export const useMatterPhysics = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  items: PhysicsItem[],
) => {
  const itemRefs = useRef<Map<string | number, HTMLElement>>(new Map());
  const bodiesMap = useRef<Map<string | number, Matter.Body>>(new Map());
  const sizesMap = useRef<Map<string | number, { w: number; h: number }>>(
    new Map(),
  );
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);
  const containerSizeRef = useRef({ height: 0, width: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const currentBodies = bodiesMap.current;
    const currentSizes = sizesMap.current;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Body,
    } = Matter;

    const engine = Engine.create({
      constraintIterations: 10,
      gravity: { scale: 0.001, x: 0, y: 1 },
      positionIterations: 20,
      timing: { timeScale: 1 },
      velocityIterations: 16,
    });
    engineRef.current = engine;

    const containerRect = containerRef.current.getBoundingClientRect();
    const { width, height } = containerRect;
    containerSizeRef.current = { height, width };

    const render = Render.create({
      canvas: canvasRef.current,
      element: containerRef.current,
      engine: engine,
      options: {
        background: 'transparent',
        height,
        width,
        wireframes: false,
      },
    });
    renderRef.current = render;

    const createWalls = (w: number, h: number) => {
      const wallOptions = { isStatic: true, restitution: 1 };
      return [
        // Sàn (dưới)
        Bodies.rectangle(
          w / 2,
          h + config.wallThickness / 2,
          w,
          config.wallThickness,
          wallOptions,
        ),
        // Tường trái
        Bodies.rectangle(
          -config.wallThickness / 2,
          h / 2,
          config.wallThickness,
          h,
          wallOptions,
        ),
        // Tường phải
        Bodies.rectangle(
          w + config.wallThickness / 2,
          h / 2,
          config.wallThickness,
          h,
          wallOptions,
        ),
        // Tường trên
        Bodies.rectangle(
          w / 2,
          -config.wallThickness / 2,
          w,
          config.wallThickness,
          wallOptions,
        ),
      ];
    };

    const walls = createWalls(width, height);
    wallsRef.current = walls;
    Composite.add(engine.world, walls);

    items.forEach((item, index) => {
      const domEl = itemRefs.current.get(item.id);
      if (!domEl) return;

      const rect = domEl.getBoundingClientRect();
      const itemWidth = item.w ?? rect.width;
      const itemHeight = item.h ?? rect.height;

      // Logic tính toán theo tỉ lệ:
      // Nếu dropX > 0 và <= 1, tính theo % chiều rộng container
      // Ngược lại nếu > 1 hoặc undefined, dùng giá trị pixel hoặc random
      const startX =
        item.dropX !== undefined
          ? item.dropX <= 1
            ? item.dropX * width
            : item.dropX
          : Math.random() * (width - itemWidth) + itemWidth / 2;

      const startY =
        item.dropY !== undefined
          ? item.dropY <= 1
            ? item.dropY * height
            : item.dropY
          : height * 0.1 + index * 10;

      const startRotation =
        item.dropX !== undefined && item.dropY !== undefined
          ? 0
          : (Math.random() - 0.5) * Math.PI;

      sizesMap.current.set(item.id, { h: itemHeight, w: itemWidth });

      const body = Bodies.rectangle(startX, startY, itemWidth, itemHeight, {
        density: config.density,
        friction: config.friction,
        frictionAir: config.frictionAir,
        render: {
          opacity: 0,
          visible: true,
        },
        restitution: config.restitution,
      });

      Body.setAngle(body, startRotation);

      currentBodies.set(item.id, body);
      Composite.add(engine.world, body);

      domEl.style.position = 'absolute';
      domEl.style.willChange = 'transform';
    });

    const mouse = Mouse.create(containerRef.current);

    const update = () => {
      items.forEach((item) => {
        const domEl = itemRefs.current.get(item.id);
        const body = bodiesMap.current.get(item.id);
        const size = sizesMap.current.get(item.id);

        if (domEl && body && size) {
          const { x, y } = body.position;
          const angle = body.angle;

          domEl.style.transform = `translate3d(${x - size.w / 2}px, ${y - size.h / 2}px, 0) rotate(${angle}rad)`;
          domEl.style.visibility = 'visible';
        }
      });
      rafRef.current = requestAnimationFrame(update);
    };

    const mouseConstraint = MouseConstraint.create(engine, {
      constraint: {
        render: { visible: false },
        stiffness: config.mouseStiffness,
      },
      mouse,
    });
    mouse.element.removeEventListener(
      'wheel',
      (mouse as ExtendedMouse).mousewheel,
    );
    Composite.add(engine.world, mouseConstraint);

    const handleResize = () => {
      window.location.reload();
    };

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);
    update();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);

      const currentRaf = rafRef.current;
      const currentRunner = runnerRef.current;
      const currentRender = renderRef.current;
      const currentEngine = engineRef.current;

      if (currentRaf) {
        cancelAnimationFrame(currentRaf);
      }
      if (currentRunner) {
        Runner.stop(currentRunner);
      }
      if (currentRender) {
        Render.stop(currentRender);
      }
      if (currentEngine) {
        Engine.clear(currentEngine);
        Composite.clear(currentEngine.world, false);
      }

      currentBodies.clear();
      currentSizes.clear();
      wallsRef.current = [];
    };
  }, [items, canvasRef, containerRef]);

  return { itemRefs };
};
