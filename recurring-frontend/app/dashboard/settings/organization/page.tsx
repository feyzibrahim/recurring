import InputWithIcon from "@/components/custom/InputWithIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineCheck } from "react-icons/ai";
import { getOrganizationData } from "@/server/getOrganizationData";
import EditButton from "./EditButton";

const page = async () => {
  const organization = await getOrganizationData();

  return (
    <div className="md:px-10 md:py-5 w-full">
      <div className="md:flex gap-5 md:w-1/2">
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Name</p>
          </Label>
          <Input
            placeholder="Name"
            defaultValue={organization && organization.name}
            className="bg-backgroundAccent"
          />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Industry</p>
          </Label>
          <Input
            placeholder="Industry"
            defaultValue={organization && organization.industry}
            className="bg-backgroundAccent"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Description</p>
        </Label>
        <Input
          placeholder="Description"
          defaultValue={organization && organization.description}
          className="bg-backgroundAccent"
        />
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Address</p>
        </Label>
        <Input
          placeholder="Address"
          defaultValue={
            organization &&
            organization.address &&
            `${organization.address.street}, ${organization.address.city}, ${organization.address.state}, ${organization.address.country}, ${organization.address.zipCode}`
          }
          className="bg-backgroundAccent"
        />
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Website</p>
        </Label>
        <Input
          placeholder="Website"
          defaultValue={organization && organization.website}
          className="bg-backgroundAccent"
        />
      </div>
      <div className="md:w-1/2 mb-5">
        <Label>
          <p className="pt-5 pb-2">Active</p>
        </Label>
        <InputWithIcon
          icon={<AiOutlineCheck className="text-green-500" />}
          placeholder="Active status"
          field={{
            defaultValue:
              organization && organization.isActive
                ? "Verified"
                : "Not Verified",
          }}
        />
      </div>
      <EditButton organization={organization} />
    </div>
  );
};

export default page;
