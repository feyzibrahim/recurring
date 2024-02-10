"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FiUser } from "react-icons/fi";
import { RiPhoneFill } from "react-icons/ri";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";
import { useState } from "react";
import DatePicker from "@/components/custom/DatePicker";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  lastName: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),

  phoneNumber: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  dateOfBirth: z.date(),
});

const UserDetails = ({ handleNext }: { handleNext: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: undefined,
      dateOfBirth: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "PATCH",
      url: "/api/user/update-profile",
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
      <h2 className="text-xl font-bold mb-4">Step 2: User Registration!</h2>
      <p>Enjoy using our app! You're all set up.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<FiUser />}
                placeholder="Enter your first name"
                title="First Name"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<FiUser />}
                placeholder="Enter your last name"
                title="Last Name"
                showTitle={true}
              />
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<RiPhoneFill />}
                placeholder="Enter your phone number"
                title="Phone Number"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <DatePicker title="Date of Birth" field={field} />
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Update Details"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </Form>
    </div>
  );
};

export default UserDetails;
