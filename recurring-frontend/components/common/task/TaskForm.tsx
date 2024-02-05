"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { commonRequest } from "@/api/client";
import { useState } from "react";
import FormInputCustom from "../FormInputCustom";
import DatePickerLimited from "@/components/custom/DatePickerLimited";
import { EmployeeList } from "./EmployeeList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { createTask } from "@/app/lib/features/task/taskActions";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  project: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .optional(),
  startDate: z.date(),
  dueDate: z.date(),
  status: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  priority: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  assignee: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  // description: z
  //   .string()
  //   .min(2, {
  //     message: "Email must be at least 2 characters.",
  //   })
  //   .max(70, { message: "Name should be Less than 30 characters" })
  //   .optional(),
  // tags: z
  //   .string()
  //   .min(2, {
  //     message: "Email must be at least 2 characters.",
  //   })
  //   .max(70, { message: "Name should be Less than 30 characters" })
  //   .optional(),
});

export default function TaskForm({
  setIsModalOpen,
  slug,
}: {
  setIsModalOpen: any;
  slug: string;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      project: slug,
      startDate: undefined,
      dueDate: undefined,
      status: "",
      priority: "",
      assignee: "",
      // description: "",
      // tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(createTask(values)).then(() => {
      setIsModalOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="w-full">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <DatePickerLimited title="Starting Date" field={field} />
              )}
            />
          </div>
          <div className="w-full">
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
          <div className="w-full">
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
                      <SelectItem value="archive">Archive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
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
            <FormItem className="flex flex-col">
              <FormLabel>Choose Assignee</FormLabel>
              <EmployeeList field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Update Details"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
