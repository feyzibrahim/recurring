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
import { SubTaskTypes } from "@/constants/Types";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  status: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
});

export default function SubTaskForm({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const dispatch = useAppDispatch();

  const { task, loading, error } = useAppSelector((state) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let val = values as SubTaskTypes;
    if (task) {
      let subTasks = [...task.subTasks, val];
      const data = await dispatch(
        editTask({ data: { subTasks: subTasks }, slug: task._id })
      );
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
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter sub task title"
              title="Title"
              showTitle={true}
            />
          )}
        />
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
        <div className="py-1"></div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Create New Task"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
