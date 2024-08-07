import { IconMenu } from '@/components/IconMenu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface DropdownOptionsProps {
  surveyId: string;
}

export const DropdownOptions = ({ surveyId }: DropdownOptionsProps) => {
  const router = useRouter();
  const [_, setCopied] = useState<boolean>(false);

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success('Link copied to clipboard.');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] z-50">
        <DropdownMenuItem className="">
          <button
            onClick={() =>
              copyToClipboard(
                `${process.env.NEXT_PUBLIC_BASE_URL}/survey?id=${surveyId}`
              )
            }
            className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
          >
            <IconMenu text="Copy" icon={<Copy className="size-4" />} />
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={() => {
              router.push(`/survey?id=${surveyId}`);
            }}
            className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
          >
            <IconMenu text="Show" icon={<Eye className="size-4" />} />
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={() => {
              // setIsDeleteOpen(true);
            }}
            className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75"
          >
            <IconMenu text="Delete" icon={<Trash2 className="size-4" />} />
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
