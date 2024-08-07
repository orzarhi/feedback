import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Survey } from '@/lib/validation';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  FieldError,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';

interface DatePickerProps {
  setValue: UseFormSetValue<Survey>;
  watch: UseFormWatch<Survey>;
  errors: { [x: string]: FieldError | undefined };
}

export const DatePicker = ({
  setValue,
  watch,
  errors,
}: DatePickerProps) => {
  const watchedDate = watch('dueDate');

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setValue('dueDate', date, { shouldValidate: true });
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !watchedDate && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {watchedDate ? format(new Date(watchedDate), 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={watchedDate}
          onSelect={handleSelect}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
      {errors.dueDate && (
        <p className="error_message">{errors.dueDate.message}</p>
      )}
    </Popover>
  );
};
