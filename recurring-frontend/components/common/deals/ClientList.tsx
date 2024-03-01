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
import { FormControl } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import { ClientTypes } from "@/constants/Types";
import UserAvatar from "../UserAvatar";

interface ClientListType {
  value: string;
  label: string;
  profileImageURL: string;
}
export function ClientList({ field }: { field: any }) {
  const [client, setClient] = useState<ClientListType[]>([]);
  const { setValue } = useFormContext();

  useEffect(() => {
    const loadData = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.CLIENT_DEALS,
        method: "GET",
        url: "/api/client",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.clients) {
        const client: ClientTypes[] = res.clients;
        const transformedManagers = client.map((cli) => ({
          value: cli._id,
          label: cli.details.name,
          profileImageURL: cli.details.profileImageURL || "",
        }));

        setClient(transformedManagers);
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
              ? client.find((emp) => emp.value === field.value)?.label
              : "Select Client"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search Client..." />
          <CommandEmpty>No Client found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-52 w-full rounded-md">
              {client.map((cli) => (
                <CommandItem
                  key={cli.value}
                  value={cli.value}
                  onSelect={() => {
                    setValue("client", cli.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      cli.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <UserAvatar
                      profileImageURL={cli.profileImageURL}
                      size="w-6 h-6"
                    />
                    {cli.label}
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
