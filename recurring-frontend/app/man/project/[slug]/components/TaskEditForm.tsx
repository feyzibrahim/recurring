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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { editTask } from "@/app/lib/features/task/taskActions";
import FormInputCustom from "@/components/common/FormInputCustom";
import { EmployeeList } from "@/components/common/task/EmployeeList";
import DatePickerNoLimit from "@/components/custom/DatePickerNoLimit";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
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
  assignee: z.any(),
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

export default function TaskEditForm({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const dispatch = useAppDispatch();

  const { task, loading, error } = useAppSelector((state) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: (task && task.title) || "",
      startDate: (task && task.startDate) || undefined,
      dueDate: (task && task.dueDate) || undefined,
      status: (task && task.status) || "",
      priority: (task && task.priority) || "",
      assignee: (task && task.assignee) || "",
      // description: "",
      // tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (task) {
      const data = await dispatch(editTask({ data: values, slug: task._id }));
      if (editTask.fulfilled.match(data)) {
        setIsModalOpen(false);
      }
    }
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
        <div className="w-full">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <DatePickerNoLimit title="Starting Date" field={field} />
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <DatePickerNoLimit title="Due Date" field={field} />
            )}
          />
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
                      <SelectItem value="backlog">Backlog</SelectItem>
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
