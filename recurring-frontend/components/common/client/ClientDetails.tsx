"use client";
import { getClient } from "@/app/lib/features/client/clientActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import UserAvatar from "../UserAvatar";
import { AiOutlineMail } from "react-icons/ai";
import { FiEdit, FiMap, FiPhoneCall } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { FaIndustry } from "react-icons/fa";

interface propsTypes {
  slug: string;
}

const ClientDetails = ({ slug }: propsTypes) => {
  const dispatch = useAppDispatch();
  const { client } = useAppSelector((state) => state.client);

  useEffect(() => {
    dispatch(getClient(slug));
  }, [dispatch, slug]);

  if (!client) {
    return <div>Loading</div>;
  }

  return (
    <div className="mx-auto w-full">
      <h1 className="text-3xl font-bold mb-4">Client Details</h1>
      <div className="border rounded-lg p-6 flex flex-col md:flex-row gap-10 relative">
        {client.details.profileImageURL && (
          <UserAvatar
            profileImageURL={client.details.profileImageURL}
            size="w-48 h-48"
          />
        )}
        <div className="flex flex-col md:flex-row md:gap-10">
          <div className="">
            <div className="mb-4">
              <p className="font-semibold text-foregroundAccent">Name:</p>
              <p>{client.details.name}</p>
            </div>
            {client.type === "company" && (
              <div className="mb-4">
                <p className="font-semibold text-foregroundAccent">
                  Contact Person:
                </p>
                <p>{client.details.contactPerson}</p>
              </div>
            )}
            <div className="mb-4">
              <p className="font-semibold text-foregroundAccent flex items-center gap-2">
                <FaIndustry />
                Industry:
              </p>
              <p>{client.industry}</p>
            </div>
          </div>
          <div className="h-full w-1 bg-backgroundAccent rounded-full"></div>
          <div className="">
            <p className="text-lg">Contact Details</p>
            <div className="mb-4">
              <p className="font-semibold text-foregroundAccent flex items-center gap-2">
                <AiOutlineMail />
                Email:
              </p>
              <p>{client.email}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-foregroundAccent flex items-center gap-2">
                <FiPhoneCall />
                Phone:
              </p>
              <p>{client.phone}</p>
            </div>
          </div>
          <div className="h-full w-1 bg-backgroundAccent rounded-full"></div>
          <div className="mb-4">
            <p className="font-semibold text-foregroundAccent flex items-center gap-2">
              <FiMap />
              Address:
            </p>
            {client.address && (
              <p>
                {client.address.street} {client.address.city}{" "}
                {client.address.state} {client.address.country}{" "}
                {client.address.zip}
              </p>
            )}
          </div>
          <Button className="absolute top-5 right-5">
            <FiEdit />
          </Button>
        </div>
      </div>
      <div>
        <h1 className="py-3 text-xl font-semibold">Description</h1>
      </div>
    </div>
  );
};

export default ClientDetails;
