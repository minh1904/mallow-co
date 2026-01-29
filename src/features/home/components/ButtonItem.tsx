'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/share/ui/button';
import { Icon } from '@/share/ui/icon';

interface ButtonItemProps {
  children: React.ReactNode;
  icon: string;
  className?: string;
}

const ButtonItem = ({ children, icon, className }: ButtonItemProps) => {
  return (
    <Button
      className={cn(
        'font-azeret-mono text-md uppercase bg-gray-200 text-black hover:bg-bg-gray-200',
        className,
      )}
    >
      <Icon icon={icon} />
      {children}
    </Button>
  );
};

export default ButtonItem;
