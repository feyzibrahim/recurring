"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormInputCustom from "@/components/common/FormInputCustom";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const formSchema = z.object({
  casualLeave: z
    .string()
    .min(1, {
      message: "Leave must be at least 1.",
    })
    .max(30, { message: "Leave should be less than 30" }),
  sickLeave: z
    .string()
    .min(1, {
      message: "Leave must be at least 1.",
    })
    .max(30, { message: "Leave should be less than 30" }),
});

export default function LeavePolicyEditForm({
  organization,
  setIsModalOpen,
}: {
  organization: any;
  setIsModalOpen: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      casualLeave: (organization && organization.casualLeave) || "",
      sickLeave: (organization && organization.sickLeave.toString()) || "",
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
      router.refresh();
      setIsModalOpen(false);
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="casualLeave"
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter number of casual leave"
              title="Casual Leave"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="sickLeave"
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter number of sick leave"
              title="Sick Leave"
              showTitle={true}
            />
          )}
        />
        <div className="py-1"></div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Update Leave Policy"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
