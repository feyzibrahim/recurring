"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FiUser } from "react-icons/fi";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";
import { useRouter } from "next/navigation";
import { commonRequest } from "@/api/client";
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Value must be at least 2 characters.",
    })
    .max(30, { message: "Value max is 30 characters" }),
});

export default function FormUsername() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let res = await commonRequest({
      method: "POST",
      url: "/auth/forgot-password",
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Log: onSubmit -> res", res);
    if (!res.success) {
      setError(res.error);
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiUser />}
              placeholder="Your Email or Username"
              showTitle={false}
            />
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
