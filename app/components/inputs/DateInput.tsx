import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface DateInputProps {}

const DateInput = ({}: DateInputProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal"
            // !field.value && "text-muted-foreground"
          )}
        >
          {/* {field.value ? (
              format(field.value, "PPP")
            ) : ( */}
          <span>Escolha a data</span>
          {/* )} */}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          // selected={field.value}
          // onSelect={field.onChange}

          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
