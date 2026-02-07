import Matter from "matter-js";
import { useEffect, useRef } from "react";

interface PhysicsItem {
	id: string | number;
	w?: number;
	h?: number;
	dropX?: number;
	dropY?: number;
}

const config = {
	density: 0.002,
	friction: 0.15,
	frictionAir: 0.01,
	gravity: { scale: 0.001, x: 0, y: 1 },
	mouseStiffness: 0.6,
	restitution: 0.5,
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
				background: "transparent",
				height,
				width,
				wireframes: false,
			},
		});
		renderRef.current = render;

		const createWalls = (w: number, h: number) => {
			const wallOptions = { isStatic: true, restitution: 0.4 };
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

			const startX =
				item.dropX ?? Math.random() * (containerRect.width - itemWidth);
			const startY = item.dropY ?? containerRect.height * 0.1 + index * 10;
			const startRotation = (Math.random() - 0.5) * Math.PI;

			sizesMap.current.set(item.id, { h: itemHeight, w: itemWidth });

			const body = Bodies.rectangle(startX, startY, itemWidth, itemHeight, {
				density: config.density,
				friction: config.friction,
				frictionAir: config.frictionAir,
				restitution: config.restitution,
			});

			Body.setAngle(body, startRotation);

			bodiesMap.current.set(item.id, body);
			Composite.add(engine.world, body);

			domEl.style.position = "absolute";
			domEl.style.willChange = "transform";
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
					domEl.style.visibility = "visible";
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
		Composite.add(engine.world, mouseConstraint);

		const handleResize = () => {
			if (!containerRef.current || !renderRef.current || !engineRef.current)
				return;

			const newRect = containerRef.current.getBoundingClientRect();
			const newWidth = newRect.width;
			const newHeight = newRect.height;

			const oldWidth = containerSizeRef.current.width;
			const oldHeight = containerSizeRef.current.height;
			containerSizeRef.current = { height: newHeight, width: newWidth };

			const scaleX = newWidth / oldWidth;
			const scaleY = newHeight / oldHeight;

			renderRef.current.canvas.width = newWidth;
			renderRef.current.canvas.height = newHeight;
			renderRef.current.options.width = newWidth;
			renderRef.current.options.height = newHeight;

			wallsRef.current.forEach((wall) => {
				Composite.remove(engineRef.current!.world, wall);
			});

			const newWalls = createWalls(newWidth, newHeight);
			wallsRef.current = newWalls;
			Composite.add(engineRef.current.world, newWalls);

			bodiesMap.current.forEach((body) => {
				const currentPos = body.position;
				const newX = currentPos.x * scaleX;
				const newY = currentPos.y * scaleY;

				const clampedX = Math.max(0, Math.min(newX, newWidth));
				const clampedY = Math.max(0, Math.min(newY, newHeight));

				Body.setPosition(body, { x: clampedX, y: clampedY });
				Body.setVelocity(body, { x: 0, y: 0 });
				Body.setAngularVelocity(body, 0);
			});
		};

		let resizeTimeout: NodeJS.Timeout;
		const debouncedResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(handleResize, 150);
		};

		window.addEventListener("resize", debouncedResize);
		const runner = Runner.create();
		runnerRef.current = runner;
		Runner.run(runner, engine);
		Render.run(render);
		update();

		return () => {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
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
			sizesMap.current.clear();
			wallsRef.current = [];
		};
	}, [items, canvasRef, containerRef]);

	return { itemRefs };
};
