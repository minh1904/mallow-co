'use client';
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface ButtonItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
          'absolute top-0 left-0 m-0 font-bold uppercase bg-white text-black rounded-xl shadow-xl border-2 border-blue-500 will-change-transform pointer-events-auto z-20',
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
ButtonItem.displayName = 'ButtonItem';
export default ButtonItem;
