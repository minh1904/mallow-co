"use client";
import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonItemProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const ButtonItem = forwardRef<HTMLButtonElement, ButtonItemProps>(
	({ children, className, style, ...props }, ref) => {
		return (
			<button
				ref={ref}
				{...props}
				style={style}
				className={cn(
					"absolute top-0 left-0 m-0 font-bold uppercase bg-white text-black shadow-xl will-change-transform pointer-events-auto z-20",
					className,
				)}
			>
				{children}
			</button>
		);
	},
);
ButtonItem.displayName = "ButtonItem";
export default ButtonItem;
