"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  street: z
    .string()
    .min(2, {
      message: "Street must be at least 2 characters.",
    })
    .max(30, { message: "Street should be less than 30 characters" }),
  city: z
    .string()
    .min(2, {
      message: "City must be at least 2 characters.",
    })
    .max(30, { message: "City should be less than 30 characters" }),
  state: z
    .string()
    .min(2, {
      message: "State must be at least 2 characters.",
    })
    .max(30, { message: "State should be less than 30 characters" }),
  country: z
    .string()
    .min(2, {
      message: "Country must be at least 2 characters.",
    })
    .max(30, { message: "Country should be less than 30 characters" }),
  zipCode: z
    .string()
    .min(2, {
      message: "zipCode must be at least 2 characters.",
    })
    .max(30, { message: "zipCode should be less than 30 characters" }),
});

export default function OrganizationCreateForm({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "test",
      description: "test",
      industry: "test",
      website: "test",
      street: "test",
      state: "test",
      city: "test",
      country: "test",
      zipCode: "189484",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "POST",
      url: "/user/organization/",
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      setError(res.error);
    }

    if (res.success) {
      router.push("/dashboard/settings/organization");
      setIsModalOpen(false);
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiUser />}
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
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
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
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
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
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
              placeholder="Enter your organization website"
              title="Website"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
              placeholder="Enter your organization street"
              title="Street"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
              placeholder="Enter your organization city"
              title="City"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
              placeholder="Enter your organization state"
              title="State"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
              placeholder="Enter your organization country"
              title="Country"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
              placeholder="Enter your organization zipCode"
              title="Zip Code"
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
  );
}
