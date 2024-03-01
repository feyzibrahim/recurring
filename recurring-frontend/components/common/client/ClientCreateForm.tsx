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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhotoUpload from "@/components/common/PhotoUpload";
import useClientHook from "./hook/useClientHook";
import { CountryList } from "../CountryList";
import { StateList } from "../StateList";
import { CityList } from "../CityList";

const ClientCreateForm = () => {
  const {
    form,
    onSubmit,
    selectedFile,
    setSelectedFile,
    loading,
    error,
    setCountryISO,
    setStateISO,
    countryISO,
    stateISO,
  } = useClientHook();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-5 pb-5"
      >
        <div className="md:grid grid-cols-4 gap-5">
          <div>
            <PhotoUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            <FormField
              control={form.control}
              name="type"
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
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter the industry of client"
                  field={field}
                  showTitle={true}
                  title="Industry"
                />
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="details.name"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter client name"
                  field={field}
                  showTitle={true}
                  title="Name"
                />
              )}
            />
            {form.watch("type") === "company" && (
              <FormField
                control={form.control}
                name="details.contactPerson"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter company contact person name"
                    field={field}
                    showTitle={true}
                    title="Contact Person Name"
                  />
                )}
              />
            )}
            <FormField
              control={form.control}
              name="phone"
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
              name="address.street"
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
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="pt-2">
                        <FormLabel>Country</FormLabel>
                        <CountryList
                          field={field}
                          setCountryISO={setCountryISO}
                          value="address.country"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="pt-2">
                        <FormLabel>State</FormLabel>
                        <StateList
                          field={field}
                          setStateISO={setStateISO}
                          countryISO={countryISO}
                          value="address.state"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="pt-2">
                        <FormLabel>City</FormLabel>
                        <CityList
                          field={field}
                          stateISO={stateISO}
                          countryISO={countryISO}
                          value="address.city"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.zipCode"
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
              {loading ? "Loading..." : "Add Client"}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ClientCreateForm;
