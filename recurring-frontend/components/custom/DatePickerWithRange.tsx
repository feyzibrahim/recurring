"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, isAfter, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const pathName = usePathname();

  const currentDate = new Date();
  const lastMonthDate = subMonths(currentDate, 1);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: lastMonthDate,
    to: currentDate,
  });

  const isDateDisabled = (day: Date): boolean => {
    return isAfter(day, addDays(new Date(), 0));
  };

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const { from, to } = selectedDate;
      const queryParams = new URLSearchParams();
      if (from) {
        queryParams.append("from", format(from, "yyyy-MM-dd"));
      } else {
        queryParams.delete("from");
      }
      if (to) {
        queryParams.append("to", format(to, "yyyy-MM-dd"));
      } else {
        queryParams.delete("to");
      }
      router.push(`${pathName}?${queryParams.toString()}`);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            disabled={isDateDisabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
