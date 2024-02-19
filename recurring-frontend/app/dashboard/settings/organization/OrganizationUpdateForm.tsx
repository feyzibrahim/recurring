"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { FiUser } from "react-icons/fi";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";
import { useRouter } from "next/navigation";
import { commonRequest } from "@/api/client";
import { useState } from "react";
import FormInputCustom from "@/components/common/FormInputCustom";
import { BiGlobe } from "react-icons/bi";
import { CountryList } from "@/components/common/CountryList";
import { StateList } from "@/components/common/StateList";
import { CityList } from "@/components/common/CityList";

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

export default function OrganizationUpdateForm({
  organization,
  setIsModalOpen,
}: {
  organization: any;
  setIsModalOpen: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countryISO, setCountryISO] = useState("");
  const [stateISO, setStateISO] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: (organization && organization.name) || "",
      description: (organization && organization.description) || "",
      industry: (organization && organization.industry) || "",
      website: (organization && organization.website) || "",
      street:
        (organization && organization.address && organization.address.street) ||
        "",
      state:
        (organization && organization.address && organization.address.state) ||
        "",
      city:
        (organization && organization.address && organization.address.city) ||
        "",
      country:
        (organization &&
          organization.address &&
          organization.address.country) ||
        "",
      zipCode:
        (organization &&
          organization.address &&
          organization.address.zipCode) ||
        "",
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

    let res = await commonRequest({
      method: "PATCH",
      url: "/user/organization/",
      data: { ...values, address },
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
            <FormInputWithIcon
              field={field}
              icon={<BiGlobe />}
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
            <FormInputCustom
              field={field}
              placeholder="Enter your organization street"
              title="Street"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <>
              <FormLabel>Country</FormLabel>
              <CountryList field={field} setCountryISO={setCountryISO} />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <>
              <FormLabel>State</FormLabel>
              <StateList
                field={field}
                setStateISO={setStateISO}
                countryISO={countryISO}
              />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <>
              <FormLabel>City</FormLabel>
              <CityList
                field={field}
                stateISO={stateISO}
                countryISO={countryISO}
              />
            </>
          )}
        />

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
          {loading ? "Loading..." : "Update Details"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
