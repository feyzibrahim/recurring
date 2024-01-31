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
import DatePickerLimited from "@/components/custom/DatePickerLimited";
import { commonRequestProject } from "@/api/client_project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhotoUpload from "./PhotoUpload";
import { useAppDispatch } from "@/app/lib/hook";
import { createEmployee } from "@/app/lib/features/employee/employeeActions";

const projectSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(8, { message: "Phone Number be at least 8 characters." }),
  email: z
    .string()
    .email()
    .min(2, { message: "Email be at least 8 characters." }),
  username: z.string().min(2, { message: "Email be at least 8 characters." }),
  employeeType: z
    .string()
    .min(2, { message: "Employee Type must be at least 2 characters." }),
  designation: z
    .string()
    .min(2, { message: "Designation must be at least 2 characters." }),
  salary: z
    .string()
    .min(2, { message: "Salary must be at least 2 characters." }),
  hireDate: z.date(),

  gender: z
    .string()
    .min(2, { message: "Gender must be at least 2 characters." }),
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

const CreateForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "",
      phoneNumber: "",
      email: "",
      employeeType: "",
      designation: "",
      salary: "",
      street: "",
      state: "",
      city: "",
      country: "",
      zipCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    console.log("Log: onSubmit -> values", values);
    await dispatch(createEmployee(values));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:grid grid-cols-4 gap-5">
          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter First Name"
                    field={field}
                    showTitle={true}
                    title="First Name"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter Last Name"
                    field={field}
                    showTitle={true}
                    title="Last Name"
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Phone Number"
                  field={field}
                  showTitle={true}
                  title="Phone Number"
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Email"
                  field={field}
                  showTitle={true}
                  title="Email"
                />
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Username"
                  field={field}
                  showTitle={true}
                  title="Username"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
            <Button type="submit" className="mt-3">
              {loading ? "Loading..." : "Add Employee"}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div>
            <PhotoUpload />
            <FormField
              control={form.control}
              name="hireDate"
              render={({ field }) => (
                <DatePickerLimited title="Hiring Date" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Salary"
                  field={field}
                  showTitle={true}
                  title="Salary"
                />
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-backgroundAccent">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-backgroundAccent">
                        <SelectValue placeholder="Select Employee Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fulltime">Fulltime</SelectItem>
                      <SelectItem value="partTime">Part Time</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-backgroundAccent">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateForm;

{
  /* <FormItem className="flex flex-col mt-3">
  <FormLabel>Gender</FormLabel>
  <Popover>
  <PopoverTrigger asChild>
    <FormControl>
      <Button
        variant="outline"
        role="combobox"
        className={cn(
          "w-[200px] justify-between bg-backgroundAccent w-full",
          !field.value && "text-muted-foreground"
        )}
      >
        {field.value
          ? gender.find((data) => data.value === field.value)?.label
          : "Select gender"}
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </FormControl>
  </PopoverTrigger>
  <PopoverContent className="w-[200px] p-0">
    <Command>
      <CommandInput
        placeholder="Search Gender..."
        className="h-9"
      />
      <CommandEmpty>No framework found.</CommandEmpty>
      <CommandGroup>
        {gender.map((data: any) => (
          <CommandItem
            value={data.label}
            key={data.value}
            onSelect={() => {
              form.setValue("gender", data.value);
            }}
          >
            {data.label}
            <CheckIcon
              className={cn(
                "ml-auto h-4 w-4",
                data.value === field.value
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
  </Popover>

  <FormMessage />
  </FormItem> */
}
