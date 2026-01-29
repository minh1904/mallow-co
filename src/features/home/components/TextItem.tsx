'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/share/ui/button';
import { Icon } from '@/share/ui/icon';

interface TextItemProps {
  children: React.ReactNode;
  icon?: string;
  className?: string;
}

const TextItem = ({ children, icon, className }: TextItemProps) => {
  return (
    <Button
      className={cn(
        'uppercase flex items-center justify-center gap-4 transition-all duration-300',
        'bg-black text-white hover:bg-black active:scale-95',
        'border-none ',
        'text-2xl min-h-14 px-6 py-4',
        'md:text-6xl md:min-h-28 md:px-10',
        'lg:text-8xl lg:min-h-36 lg:px-16',
        className,
      )}
    >
      {icon && <Icon icon={icon} className="size-[0.8em] stroke-[1.5]" />}
      <span className="leading-none">{children}</span>
    </Button>
  );
};
TextItem.displayName = 'TextItem';
export default TextItem;
