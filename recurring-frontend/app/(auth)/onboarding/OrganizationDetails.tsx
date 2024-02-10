"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useState } from "react";
import FormInputCustom from "@/components/common/FormInputCustom";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, { message: "Name should be less than 30 characters" }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(100, { message: "Description should be less than 30 characters" }),
  industry: z
    .string()
    .min(2, {
      message: "Industry must be at least 2 characters.",
    })
    .max(30, { message: "Industry should be less than 30 characters" }),
  website: z
    .string()
    .min(2, {
      message: "Website must be at least 2 characters.",
    })
    .max(30, { message: "website should be less than 30 characters" }),
});
const OrganizationDetails = ({ handleNext }: { handleNext: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "test",
      description: "test",
      industry: "test",
      website: "test",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "PATCH",
      url: "/api/user/organization/",
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      setError(res.error);
    }

    if (res.success) {
      handleNext();
    }
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 3: Organization Details</h2>
      <p>Explore the features and functionalities of our app.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInputCustom
                field={field}
                placeholder="Enter your organization name"
                title="Name"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormInputCustom
                field={field}
                placeholder="Enter your organization description"
                title="Description"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormInputCustom
                field={field}
                placeholder="Enter your organization industry"
                title="Industry"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormInputCustom
                field={field}
                placeholder="Enter your organization website"
                title="Website"
                showTitle={true}
              />
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Create Organization"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </Form>
    </div>
  );
};

export default OrganizationDetails;
