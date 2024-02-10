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
import { useRouter } from "next/navigation";

const formSchema = z.object({
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
const OrganizationAddress = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: "test",
      state: "test",
      city: "test",
      country: "test",
      zipCode: "189484",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const address = {
      street: values.street,
      city: values.city,
      state: values.state,
      country: values.country,
      zipCode: values.zipCode,
    };

    let res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "PATCH",
      url: "/api/user/organization/",
      data: { address },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      setError(res.error);
    }

    if (res.success) {
      console.log("file: OrganizationAddress.tsx:77 -> onSubmit -> res", res);
      router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 4: Organization Address</h2>
      <p>Explore the features and functionalities of our app.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormInputCustom
                field={field}
                placeholder="Enter your organization street"
                title="Street"
                showTitle={true}
              />
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Enter your organization country"
                  title="Country"
                  showTitle={true}
                />
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Enter your organization state"
                  title="State"
                  showTitle={true}
                />
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Enter your organization city"
                  title="City"
                  showTitle={true}
                />
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormInputCustom
                field={field}
                placeholder="Enter your organization zipCode"
                title="Zip Code"
                showTitle={true}
              />
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Save Address"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </Form>
    </div>
  );
};

export default OrganizationAddress;
