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
import useNoteCreateHook from "./useNoteCreateHook";

interface Props {
  setIsModalOpen: any;
  slug: string;
}

const NoteAddForm = ({ setIsModalOpen, slug }: Props) => {
  const { form, onSubmit, loading, error } = useNoteCreateHook(
    setIsModalOpen,
    slug
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Note"
                  {...field}
                  className="my-2 h-60 bg-backgroundAccent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-3">
          {loading ? "Loading..." : "Add Note"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default NoteAddForm;
