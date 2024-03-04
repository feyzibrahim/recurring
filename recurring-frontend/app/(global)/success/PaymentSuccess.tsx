"use client";
import { actualCommonRequest } from "@/api/actual_client";
import { Button } from "@/components/ui/button";
import { API_ROUTES } from "@/lib/routes";
import { getObject } from "@/util/localStorage";
import Link from "next/link";
import { useEffect } from "react";
const PaymentSuccess = () => {
  const data = getObject("subscription_session");
  console.log("file: PaymentSuccess.tsx:7 -> PaymentSuccess -> data", data);

  const handleSave = async () => {
    const res = await actualCommonRequest({
      route: API_ROUTES.SUBSCRIPTION,
      method: "POST",
      url: "/api/subscription/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: { customerId: data.customer },
    });
    console.log("file: PaymentSuccess.tsx:25 -> handleSave -> res", res);
  };

  useEffect(() => {
    handleSave();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Payment Successful!</h1>
      <p className="text-lg mb-8">
        Thank you for subscribing. Your payment has been successfully processed.
      </p>
      <Link href="/dashboard/billing">
        <Button className="px-8 py-3rounded-md">Go to Billing</Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
