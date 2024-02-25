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

interface Manager {
  value: string;
  label: string;
  profileImageURL: string;
}
export function ManagerList({ field }: { field: any }) {
  const [managers, setManagers] = useState<Manager[]>([]);
  const { setValue } = useFormContext();

  useEffect(() => {
    const loadData = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.EMPLOYEE,
        method: "GET",
        url: "/api/employee/with-role?role=manager",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.employees) {
        const managers: EmployeeTypes[] = res.employees;
        const transformedManagers = managers.map((manager) => ({
          value: manager._id,
          label: `${manager.firstName} ${manager.lastName}`,
          profileImageURL: manager.profileImageURL || "",
        }));

        setManagers(transformedManagers);
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
              ? managers.find((manager) => manager.value === field.value)?.label
              : "Select manager"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search Manager..." />
          <CommandEmpty>No Manager found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-52 w-full rounded-md">
              {managers.map((manager) => (
                <CommandItem
                  key={manager.value}
                  value={manager.value}
                  onSelect={() => {
                    setValue("manager", manager.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      manager.value === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full overflow-clip">
                      <Image
                        src={manager.profileImageURL || UserAvatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    {manager.label}
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
