"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";

interface PhysicsItem {
	id: string | number;
	w?: number;
	h?: number;
	dropX?: number;
	dropY?: number;
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
	);
	const engineRef = useRef<Matter.Engine | null>(null);
	const runnerRef = useRef<Matter.Runner | null>(null);
	const renderRef = useRef<Matter.Render | null>(null);
	const wallsRef = useRef<Matter.Body[]>([]);
	const containerSizeRef = useRef({ width: 0, height: 0 });

	//  THÊM: Track vị trí chuột
	const mousePositionRef = useRef<{ x: number; y: number } | null>(null);

	const config = {
		gravity: { x: 0, y: 1, scale: 0.001 },
		restitution: 0.5,
		friction: 0.1,
		frictionAir: 0.01,
		density: 0.001,
		wallThickness: 50,
		//  THÊM: Cấu hình lực đẩy
		repulsion: {
			enabled: true,
			range: 150, // Bán kính ảnh hưởng (px)
			strength: 0.0008, // Độ mạnh lực đẩy
		},
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
		containerSizeRef.current = { width, height };

		// 2. Render (Canvas trong suốt)
		const render = Render.create({
			element: containerRef.current,
			engine: engine,
			canvas: canvasRef.current,
			options: {
				width,
				height,
				background: "transparent",
				wireframes: false,
			},
		});
		renderRef.current = render;

		// 3. Hàm tạo 4 bức tường
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

		// 4. Hàm tính tọa độ rơi
		const getDropPosition = (
			item: PhysicsItem,
			index: number,
			itemWidth: number,
			itemHeight: number,
			containerWidth: number,
			containerHeight: number,
		): { x: number; y: number } => {
			let startX: number;
			let startY: number;

			// Tính X
			if (item.dropX !== undefined) {
				if (item.dropX <= 1 && item.dropX >= 0) {
					startX = item.dropX * containerWidth;
				} else {
					startX = item.dropX;
				}
			} else {
				const padding = itemWidth / 2 + 20;
				startX = padding + Math.random() * (containerWidth - padding * 2);
			}

			// Tính Y
			if (item.dropY !== undefined) {
				startY = item.dropY;
			} else {
				const spacing = Math.min(100, containerHeight / (items.length + 2));
				startY = containerHeight * 0.1 + index * spacing;
			}

			return { x: startX, y: startY };
		};

		// 5. Tạo vật thể vật lý từ DOM Elements
		items.forEach((item, index) => {
			const domEl = itemRefs.current.get(item.id);
			if (!domEl) return;

			const rect = domEl.getBoundingClientRect();
			const itemWidth = item.w ?? rect.width;
			const itemHeight = item.h ?? rect.height;

			if (itemWidth === 0 || itemHeight === 0) {
				console.warn(
					`Item ${item.id} has invalid size: ${itemWidth}x${itemHeight}`,
				);
				return;
			}

			sizesMap.current.set(item.id, { w: itemWidth, h: itemHeight });

			const { x: startX, y: startY } = getDropPosition(
				item,
				index,
				itemWidth,
				itemHeight,
				width,
				height,
			);

			const body = Bodies.rectangle(startX, startY, itemWidth, itemHeight, {
				restitution: config.restitution,
				friction: config.friction,
				frictionAir: config.frictionAir,
				density: config.density,
			});

			Body.setAngle(body, (Math.random() - 0.5) * 0.5);
			(body as any).defaultInertia = body.inertia;

			bodiesMap.current.set(item.id, body);
			Composite.add(engine.world, body);

			// Trigger fade-in bằng cách thêm class sau delay
			setTimeout(() => {
				domEl.classList.remove("opacity-0");
				domEl.classList.add("opacity-100");
			}, index * 100);
		});

		// 6. Xử lý kéo thả
		const mouse = Mouse.create(containerRef.current);
		mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
		mouse.element.removeEventListener(
			"DOMMouseScroll",
			(mouse as any).mousewheel,
		);
		mouse.element.removeEventListener("touchmove", (mouse as any).mousemove);

		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: { visible: false },
			},
		});
		Composite.add(engine.world, mouseConstraint);

		Events.on(mouseConstraint, "startdrag", (event) => {
			Body.setInertia(event.body, Infinity);
		});

		Events.on(mouseConstraint, "enddrag", (event) => {
			const defaultInertia = (event.body as any).defaultInertia || 1000;
			Body.setInertia(event.body, defaultInertia);
		});

		//  6.5. THÊM: Track vị trí chuột
		const handleMouseMove = (e: MouseEvent) => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			mousePositionRef.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
		};

		const handleMouseLeave = () => {
			mousePositionRef.current = null;
		};

		containerRef.current.addEventListener("mousemove", handleMouseMove);
		containerRef.current.addEventListener("mouseleave", handleMouseLeave);

		//  7. HÀM ÁP DỤNG LỰC ĐẨY
		const applyRepulsionForce = () => {
			if (!config.repulsion.enabled || !mousePositionRef.current) return;

			const mousePos = mousePositionRef.current;
			const { range, strength } = config.repulsion;

			bodiesMap.current.forEach((body) => {
				// Bỏ qua nếu đang được kéo
				if (body === mouseConstraint.body) return;

				const bodyPos = body.position;
				const dx = bodyPos.x - mousePos.x;
				const dy = bodyPos.y - mousePos.y;
				const distanceSquared = dx * dx + dy * dy;
				const distance = Math.sqrt(distanceSquared);

				// Chỉ áp dụng lực nếu trong phạm vi
				if (distance < range && distance > 0) {
					// Tính lực đẩy (mạnh hơn khi gần, yếu hơn khi xa)
					const distRatio = 1 - distance / range; // 0 ở rìa, 1 ở tâm
					const forceMagnitude = strength * distRatio ** 2; // Lực tăng cực mạnh khi lại gần

					const forceX = (dx / distance) * forceMagnitude * body.mass * 10;
					const forceY = (dy / distance) * forceMagnitude * body.mass * 10;
					// Áp dụng lực
					Body.applyForce(body, bodyPos, { x: forceX, y: forceY });
				}
			});
		};

		// 8. Hàm Update: Đồng bộ Matter -> DOM
		let animationId: number;
		const update = () => {
			//  ÁP DỤNG LỰC ĐẨY TRƯỚC KHI UPDATE
			applyRepulsionForce();

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
			animationId = requestAnimationFrame(update);
		};

		// 9. Xử lý resize
		const handleResize = () => {
			if (!containerRef.current || !renderRef.current || !engineRef.current)
				return;

			const newRect = containerRef.current.getBoundingClientRect();
			const newWidth = newRect.width;
			const newHeight = newRect.height;

			const oldWidth = containerSizeRef.current.width;
			const oldHeight = containerSizeRef.current.height;
			containerSizeRef.current = { width: newWidth, height: newHeight };

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

		// 10. Khởi chạy
		const runner = Runner.create();
		runnerRef.current = runner;
		Runner.run(runner, engine);
		Render.run(render);
		animationId = requestAnimationFrame(update);

		// 11. Cleanup
		return () => {
			clearTimeout(resizeTimeout);
			cancelAnimationFrame(animationId);
			window.removeEventListener("resize", debouncedResize);

			//  CLEANUP mouse events
			if (containerRef.current) {
				containerRef.current.removeEventListener("mousemove", handleMouseMove);
				containerRef.current.removeEventListener(
					"mouseleave",
					handleMouseLeave,
				);
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
