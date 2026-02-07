"use client";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { useMatterPhysics } from "../hooks/useMatterPhysics";

interface PhysicsItem {
	id: string | number;
	label?: string;
	src?: string;
	type: "button" | "photo";
	dropX?: number;
	dropY?: number;
}

export const HeroSection = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const items = useMemo<PhysicsItem[]>(
		() => [
			{ id: "btn-1", label: "Work", type: "button" },
			{ id: "btn-2", label: "Creative", type: "button" },
			{ id: "btn-3", label: "Next.js", type: "button" },
			{ id: "btn-4", label: "React", type: "button" },
			{ id: "btn-5", label: "TypeScript", type: "button" },
			{ id: "btn-6", label: "Tailwind", type: "button" },
			{ id: "btn-7", label: "Matter.js", type: "button" },
			{ id: "photo-1", src: "/images/img_1.jpg", type: "photo" },
			{ id: "photo-2", src: "/images/img_2.jpg", type: "photo" },
			{ id: "photo-3", src: "/images/img_3.jpg", type: "photo" },
			{ id: "photo-4", src: "/images/img_4.jpg", type: "photo" },
			{ id: "photo-5", src: "/images/img_5.jpg", type: "photo" },
			{ id: "photo-6", src: "/images/img_6.jpg", type: "photo" },
			{ id: "photo-7", src: "/images/img_7.jpg", type: "photo" },
			{ id: "photo-8", src: "/images/img_8.jpg", type: "photo" },
			{ id: "photo-9", src: "/images/img_9.jpg", type: "photo" },
			{ id: "photo-10", src: "/images/img_10.jpg", type: "photo" },
		],
		[],
	);
	const { itemRefs } = useMatterPhysics(containerRef, canvasRef, items);
	return (
		<div
			ref={containerRef}
			className="relative w-full h-screen overflow-hidden select-none bg-gray-900"
		>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 pointer-events-none opacity-0 z-0"
			/>
			{items.map((item) => {
				if (item.type === "button") {
					return (
						<button
							key={item.id}
							type="button"
							ref={(el) => {
								if (el) itemRefs.current.set(item.id, el);
								else itemRefs.current.delete(item.id);
							}}
							className="absolute top-0 left-0 m-0 px-6 py-3 rounded-full font-bold uppercase bg-white text-black shadow-xl will-change-transform pointer-events-auto z-20"
							style={{ visibility: "hidden" }}
						>
							{item.label}
						</button>
					);
				}
				return (
					<Image
						src={item.src ?? ""}
						width={160}
						key={item.id}
						ref={(el) => {
							if (el) itemRefs.current.set(item.id, el);
							else itemRefs.current.delete(item.id);
						}}
						height={160}
						alt=""
						draggable={false}
						className="w-36 h-36 absolute left-0 top-0 object-cover pointer-events-auto select-none"
						style={{ visibility: "hidden" }}
						priority={true}
					/>
				);
			})}
		</div>
	);
};
