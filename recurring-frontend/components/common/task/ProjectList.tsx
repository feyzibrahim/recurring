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
import { ProjectTypes } from "@/constants/Types";

interface ProjectListType {
  value: string;
  label: string;
}
export function ProjectList({ field }: { field: any }) {
  const [projects, setProjects] = useState<ProjectListType[]>([]);
  const { setValue } = useFormContext();

  useEffect(() => {
    const loadData = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.PROJECT,
        method: "GET",
        url: "/api/project",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.projects) {
        const projects: ProjectTypes[] = res.projects;
        const transformedManagers = projects.map((project) => ({
          value: project._id,
          label: project.name,
        }));

        setProjects(transformedManagers);
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
              ? projects.find((project) => project.value === field.value)?.label
              : "Select Project"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search Project..." />
          <CommandEmpty>No Project found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-52 w-full rounded-md">
              {projects.map((project) => (
                <CommandItem
                  key={project.value}
                  value={project.value}
                  onSelect={() => {
                    setValue("project", project.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      project.value === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div>{project.label}</div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
