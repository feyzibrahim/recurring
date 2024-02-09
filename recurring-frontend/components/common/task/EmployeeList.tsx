"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";
import { FormControl } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import { EmployeeTypes } from "@/constants/Types";

interface EmployeeListType {
  value: string;
  label: string;
  profileImageURL: string;
}
export function EmployeeList({ field }: { field: any }) {
  const [employee, setEmployee] = useState<EmployeeListType[]>([]);
  const { setValue } = useFormContext();

  useEffect(() => {
    const loadData = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.EMPLOYEE,
        method: "GET",
        url: "/api/employee/with-role?role=employee",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.employees) {
        const employee: EmployeeTypes[] = res.employees;
        const transformedManagers = employee.map((emp) => ({
          value: emp._id,
          label: `${emp.firstName} ${emp.lastName}`,
          profileImageURL: emp.profileImageURL || "",
        }));

        setEmployee(transformedManagers);
      }
    };
    loadData();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between bg-backgroundAccent",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? employee.find((emp) => emp.value === field.value)?.label
              : "Select Employee"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search Employee..." />
          <CommandEmpty>No Employee found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-52 w-full rounded-md">
              {employee.map((emp) => (
                <CommandItem
                  key={emp.value}
                  value={emp.value}
                  onSelect={() => {
                    setValue("assignee", emp.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      emp.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full overflow-clip">
                      <Image
                        src={emp.profileImageURL || UserAvatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    {emp.label}
                  </div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
