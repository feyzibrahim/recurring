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
import { format } from "date-fns";
import DatePickerLimitedString from "@/components/custom/DatePickerLimitedString";
import { usePathname } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" })
    .optional(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  status: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" })
    .optional(),
  priority: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" })
    .optional(),
  assignee: z.any(),
  description: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(300, { message: "Name should be Less than 300 characters" })
    .optional(),
});

export default function TaskEditForm({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const path = usePathname();
  const curr = path.split("/")[1];
  const dispatch = useAppDispatch();

  const { task, loading, error } = useAppSelector((state) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: (task && task.title) || "",
      startDate:
        (task && format(new Date(task.startDate), "MMM d, yyyy")) || undefined,
      dueDate:
        (task && format(new Date(task.dueDate), "MMM d, yyyy")) || undefined,
      status: (task && task.status) || "",
      priority: (task && task.priority) || "",
      assignee: (task && task.assignee) || "",
      description: (task && task.description) || "",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          disabled={curr === "home"}
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter task title"
              title="Task Title"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Description"
                  className="bg-backgroundAccent"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full">
          <FormField
            control={form.control}
            name="startDate"
            disabled={curr === "home"}
            render={({ field }) => (
              <DatePickerLimitedString title="Starting Date" field={field} />
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="dueDate"
            disabled={curr === "home"}
            render={({ field }) => (
              <DatePickerLimitedString title="Due Date" field={field} />
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
              disabled={curr === "home"}
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
          disabled={curr === "home"}
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
