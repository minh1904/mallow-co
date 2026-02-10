'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};
