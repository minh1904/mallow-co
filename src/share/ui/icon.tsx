import { cn } from '@/lib/utils';

type IconProps = React.ComponentPropsWithoutRef<'span'> & {
  icon: string;
};

function Icon({ className, icon, ...props }: IconProps) {
  return <span {...props} className={cn('iconify', icon, className)}></span>;
}

export { Icon };
