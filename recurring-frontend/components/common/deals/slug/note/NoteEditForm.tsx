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
import FormInputCustom from "@/components/common/FormInputCustom";
import { Textarea } from "@/components/ui/textarea";
import { NoteTypes } from "@/constants/Types";
import useNoteEditHook from "./useNoteEditHook";

interface Props {
  setIsModalOpen: any;
  slug: string;
  note: NoteTypes;
}

const NoteEditForm = ({ setIsModalOpen, slug, note }: Props) => {
  const { form, onSubmit, loading, error } = useNoteEditHook(
    setIsModalOpen,
    slug,
    note
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Project Description"
                  {...field}
                  className="my-2 h-60 bg-backgroundAccent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-3">
          {loading ? "Loading..." : "Edit Note"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default NoteEditForm;
