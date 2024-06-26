"use client";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { Label } from "@/components/ui/label";
import { AiOutlineCheck } from "react-icons/ai";
import EditButton from "../../app/dashboard/settings/organization/EditButton";
import InputBox from "@/components/common/InputBox";
import { useContext, useEffect, useState } from "react";
import { OrganizationTypes } from "@/constants/Types";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import { UserContext } from "./chat/UserProvider/UserContextProvider";

const OrganizationDetails = () => {
  const [organization, setOrganization] = useState<OrganizationTypes>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadData = async () => {
      const data = await actualCommonRequest({
        route: API_ROUTES.AUTH,
        method: "GET",
        url: "/api/user/organization",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setOrganization(data.organization);
    };

    loadData();
  }, []);

  return (
    <>
      <div className="md:flex gap-5 md:w-1/2">
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Name</p>
          </Label>
          <InputBox data={organization && organization.name} />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Industry</p>
          </Label>
          <InputBox data={organization && organization.industry} />
        </div>
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Description</p>
        </Label>
        <InputBox data={organization && organization.description} />
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Address</p>
        </Label>
        <InputBox
          data={
            organization &&
            organization.address &&
            `${organization.address.street}, ${organization.address.city}, ${organization.address.state}, ${organization.address.country}, ${organization.address.zipCode}`
          }
        />
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Website</p>
        </Label>
        <InputBox data={organization && organization.website} />
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
      {user && user.role !== "employee" && (
        <EditButton organization={organization} />
      )}
    </>
  );
};

export default OrganizationDetails;
