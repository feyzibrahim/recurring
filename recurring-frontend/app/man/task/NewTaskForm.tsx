"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePickerLimited from "@/components/custom/DatePickerLimited";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInputCustom from "@/components/common/FormInputCustom";
import { EmployeeList } from "@/components/common/task/EmployeeList";
import { ProjectList } from "@/components/common/task/ProjectList";
import { useContext } from "react";
import { TaskContext } from "./TaskContextProvider";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NewTaskFrom() {
  const { loading, error, form, onSubmit } = useContext(TaskContext);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ScrollArea className="h-[400px] px-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormInputCustom
                field={field}
                placeholder="Enter task title"
                title="Task Title"
                showTitle={true}
              />
            )}
          />
          <div className="flex gap-5">
            <div className="w-full mt-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <DatePickerLimited title="Starting Date" field={field} />
                )}
              />
            </div>
            <div className="w-full mt-2">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <DatePickerLimited title="Due Date" field={field} />
                )}
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-full mt-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-backgroundAccent">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="backlog">Backlog</SelectItem>
                        <SelectItem value="archive">Archive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full mt-2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-backgroundAccent">
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2">
                <FormLabel>Choose Assignee</FormLabel>
                <EmployeeList field={field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2">
                <FormLabel>Choose Project</FormLabel>
                <ProjectList field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </ScrollArea>

        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? "Loading..." : "Update Details"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
