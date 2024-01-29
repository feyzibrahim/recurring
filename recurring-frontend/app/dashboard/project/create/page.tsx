"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FormInputCustom from "@/components/common/FormInputCustom";
import { Textarea } from "@/components/ui/textarea";
import DatePickerLimited from "@/components/custom/DatePickerLimited";
import { commonRequestProject } from "@/api/client_project";

const projectSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  startDate: z.date(),
  // organization: z.string(),
  // tasks: z.array(z.string()),
  endDate: z.date(),
  // members: z.array(z.string()),
  // status: z
  //   .string()
  //   .refine((status) =>
  //     ["planning", "active", "completed", "archive", "backlog"].includes(status)
  //   ),
  description: z.string().optional(),
  // manager: z.string().optional(),
  // client: z.string().optional(),
  // deal: z.string().optional(),
});

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      startDate: undefined,
      // organization: "",
      // tasks: [],
      endDate: undefined,
      // members: [],
      // status: "",
      description: "",
      // manager: "",
      // client: "",
      // deal: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    setLoading(true);
    let res = await commonRequestProject({
      method: "POST",
      url: "/project",
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Log: onSubmit -> res", res);

    if (!res.success) {
      setError(res.error);
    }

    if (res.success) {
      router.back();
    }

    setLoading(false);
  };

  return (
    <div className="md:px-10 md:py-5 w-full">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Create Project</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="md:grid grid-cols-4 gap-5">
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter Project Name"
                    field={field}
                    showTitle={true}
                    title="Project Name"
                  />
                )}
              />
              <div className="py-2"></div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Project Description"
                        {...field}
                        className="my-2 h-52 bg-backgroundAccent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <DatePickerLimited title="Start Date" field={field} />
                )}
              />
              <div className="py-2"></div>
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <DatePickerLimited title="End Date" field={field} />
                )}
              />
            </div>
          </div>

          <Button type="submit" className="" disabled={loading}>
            {loading ? "Loading..." : "Create Project"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </Form>
    </div>
  );
};

export default page;
