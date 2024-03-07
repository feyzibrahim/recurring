"use client";
import { Button } from "@/components/ui/button";
import { deleteObject, getObject } from "@/util/localStorage";
import Link from "next/link";
import { useEffect } from "react";
const PaymentFailed = () => {
  const handleSave = async () => {
    const data = getObject("subscription_session");
    if (data) {
      deleteObject("subscription_session");
    }
  };

  useEffect(() => {
    handleSave();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Payment Failed!</h1>
      <p className="text-lg mb-8">
        Please try later something went wrong with the server
      </p>
      <Link href="/dashboard/billing">
        <Button className="px-8 py-3rounded-md">Go to Billing</Button>
      </Link>
    </div>
  );
};

export default PaymentFailed;
