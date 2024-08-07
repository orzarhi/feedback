import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface IconMenuProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

export const IconMenu = ({ className, icon, text }: IconMenuProps) => {
  return (
    <div
      className={cn(
        'flex flex-row text-center items-center justify-center space-x-2',
        className
      )}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
};
