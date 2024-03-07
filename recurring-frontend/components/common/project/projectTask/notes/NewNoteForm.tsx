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
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { editTask } from "@/app/lib/features/task/taskActions";
import { EmployeeTypes, NotesTypes } from "@/constants/Types";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  text: z
    .string()
    .min(2, {
      message: "Text must be at least 2 characters.",
    })
    .max(500, { message: "Text should be Less than 500 characters" }),
  user: z.string(),
});

export default function NewNoteForm({
  setIsModalOpen,
  user,
}: {
  setIsModalOpen: any;
  user: EmployeeTypes;
}) {
  const dispatch = useAppDispatch();

  const { task, loading, error } = useAppSelector((state) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      user: user._id || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let val = values as NotesTypes;
    if (task) {
      let notes = [...task.notes, val];
      const data = await dispatch(
        editTask({ data: { notes: notes }, slug: task._id })
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your comment"
                  {...field}
                  className="my-2 h-52 bg-backgroundAccent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-1"></div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Add new comment"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
