import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface DatePickerProps {
  dueDate: Date;
  setDueDate: Dispatch<SetStateAction<Date | undefined>>;
  isSubmitted?: boolean;
}

export const DatePicker = ({ dueDate, setDueDate, isSubmitted }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !dueDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={setDueDate}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
      {isSubmitted && !dueDate && <span className="error_message">Due date is required</span>}
    </Popover>
  );
};
