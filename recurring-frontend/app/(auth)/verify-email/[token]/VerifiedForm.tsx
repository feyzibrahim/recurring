"use client";
import { commonRequest } from "@/api/client";
import { useEffect } from "react";
import RecurringVertical from "@/components/common/RecurringVertical";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VerifiedForm = (params: any) => {
  useEffect(() => {
    commonRequest({
      method: "GET",
      url: `/auth/verify-email/${params.token}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [params]);

  return (
    <div className="bg-backgroundAccent p-8 rounded-lg shadow-md max-w-md w-full text-center">
      <RecurringVertical
        size={25}
        fontSize="text-2xl"
        styling="mb-6 justify-center"
      />
      <h1 className="text-4xl font-semibold mb-4 text-green-400">
        Email Verified!
      </h1>
      <p className="mb-6">
        Your email has been successfully verified. Welcome to Recurring App!
      </p>
      <Link href="/dashboard">
        <Button className="hover:underline">Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default VerifiedForm;
