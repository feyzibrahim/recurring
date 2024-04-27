import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

interface InputWithIconProps {
  field?: any;
  title: string;
}

const DatePickerString: React.FC<InputWithIconProps> = ({ field, title }) => {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{title}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={
                "w-full pl-3 text-left font-normal bg-backgroundAccent"
              }
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(da) => field.onChange(da?.toString())}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={1960}
            toYear={2030}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default DatePickerString;
