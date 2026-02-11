import Image from 'next/image';
import type { PhysicsItem } from '@/features/home/types/modal';
import { cn } from '@/lib/utils';

interface HeroItemProps {
  item: PhysicsItem;
  itemRef: (el: HTMLElement | null) => void;
}

export const HeroItem = ({ item, itemRef }: HeroItemProps) => {
  if (item.type === 'button') {
    return (
      <span
        ref={itemRef}
        className={cn(
          'absolute z-20 select-none rounded-md font-medium uppercase tracking-tighter shadow-sm',
          'cursor-grab hover:shadow-xl active:cursor-grabbing',
          'px-4 py-2 text-2xl md:px-6 md:py-4 md:text-5xl lg:px-8 lg:text-7xl',
          item.className,
        )}
        style={{ visibility: 'hidden' }}
      >
        {item.label}
      </span>
    );
  }

  return (
    <div
      ref={itemRef}
      className={cn(
        'absolute z-20 shadow-sm',
        'cursor-grab active:cursor-grabbing',
        'h-32 w-32 md:h-44 md:w-44 lg:h-64 lg:w-64',
        item.className,
      )}
      style={{ visibility: 'hidden' }}
    >
      <Image
        src={item.src ?? ''}
        fill
        alt=""
        draggable={false}
        className="select-none rounded-md object-cover"
        priority
      />
    </div>
  );
};
