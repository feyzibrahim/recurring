"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { actualCommonRequest } from "@/api/actual_client";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";
import { Button } from "@/components/ui/button";
import { API_ROUTES } from "@/lib/routes";
import React, { useContext, useState } from "react";
import DetailsForm from "./DetailsForm";

interface Props {
  title: string;
  value: string;
}

const SubscribeButton = ({ title, value }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(UserContext);

  const handleSubscribe = async () => {
    if (user) {
      const res = await actualCommonRequest({
        route: API_ROUTES.SUBSCRIPTION,
        method: "POST",
        url: "/api/subscription",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          price: value,
          email: user?.email,
        },
      });
      console.log(
        "file: SubscribeButton.tsx:30 -> handleSubscribe -> res",
        res
      );
      if (res.success) {
        window.location.href = res.session.url;
      }
    }
  };

  return (
    <>
      <Button className="my-5" onClick={() => setIsModalOpen(true)}>
        {title}
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enter your details</DialogTitle>
            <DialogDescription>
              To subscribe we need your details as per the Indian Laws, So
              please enter below details.
            </DialogDescription>
          </DialogHeader>
          <DetailsForm setIsModalOpen={setIsModalOpen} />
          {/* <DealEditForm setIsModalOpen={setIsModalOpen} slug={slug} /> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeButton;
