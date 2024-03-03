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
import useActivityCreateHook from "./useActivityCreateHook";

interface Props {
  setIsModalOpen: any;
  slug: string;
}

const ActivityAddForm = ({ setIsModalOpen, slug }: Props) => {
  const { form, onSubmit, loading, error } = useActivityCreateHook(
    setIsModalOpen,
    slug
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormInputCustom
              placeholder="Enter title"
              field={field}
              showTitle={true}
              title="Name"
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
          {loading ? "Loading..." : "Add Activity"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default ActivityAddForm;
