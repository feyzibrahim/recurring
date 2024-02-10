"use client";
import { commonRequest } from "@/api/client";
import { useEffect, useState } from "react";
import RecurringVertical from "@/components/common/RecurringVertical";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmployeeTypes } from "@/constants/Types";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const VerifiedForm = (params: any) => {
  const [user, setUser] = useState<EmployeeTypes>();

  useEffect(() => {
    const verifyUser = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.AUTH,
        method: "GET",
        url: `/api/auth/verify-email/${params.token}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.success) {
        console.log(res);
        setUser(res.user);
      }
    };
    verifyUser();
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
      {user?.role === "employee" ? (
        <Link href="/set-new-password">
          <Button className="hover:underline">
            Set password for your account
          </Button>
        </Link>
      ) : (
        <Link href="/onboarding">
          <Button className="hover:underline">Complete Registration</Button>
        </Link>
      )}
    </div>
  );
};

export default VerifiedForm;
