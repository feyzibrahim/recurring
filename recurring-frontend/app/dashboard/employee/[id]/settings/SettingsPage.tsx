"use client";
import { actualCommonRequest } from "@/api/actual_client";
import Recurring from "@/components/common/Recurring";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { API_ROUTES } from "@/lib/routes";
import { useState } from "react";

const SettingsPage = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const sendInvitation = async () => {
    setLoading(true);
    const res = await actualCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: `/api/employee/employee-send-verification-email/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.success) {
      console.log("file: SettingsPage.tsx:24 -> sendInvitation -> res", res);
      toast({
        title: "Employee Invitation Send Successfully",
        description:
          "Verification link will expire in 1 hr make sure to verify with in that time",
        variant: "light",
      });
    }
    setLoading(false);
  };

  return (
    <div className="mx-5">
      <p className="pt-5">Employee Invitation</p>
      <p className="text-sm text-foregroundAccent md:w-1/2 py-2">
        Invite employee to the app in order to access <Recurring />
      </p>
      <Button onClick={sendInvitation} disabled={loading}>
        {loading ? "Loading" : "Send Invitation"}
      </Button>
    </div>
  );
};

export default SettingsPage;
