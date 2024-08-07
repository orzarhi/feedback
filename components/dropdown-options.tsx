import { IconMenu } from '@/components/icon-menu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { ReactNode } from 'react';

interface DropdownOptionsProps {
  items: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
  }[];
}

export const DropdownOptions = ({ items }: DropdownOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] z-50">
        {items.map((item) => (
          <DropdownMenuItem key={item.label}>
            <button
              onClick={item.onClick}
              className={cn(
                'w-full justify-start flex rounded-md p-2 transition-all duration-75',
                {
                  'text-red-500': item.label === 'Delete',
                }
              )}
            >
              <IconMenu text={item.label} icon={item.icon} />
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
