"use client";
import { actualCommonRequest } from "@/api/actual_client";
import Recurring from "@/components/common/Recurring";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { API_ROUTES } from "@/lib/routes";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import TerminationForm from "./TerminationForm";

const SettingsPage = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="my-5">
      <div className="border p-5 rounded-lg">
        <p>Employee Invitation</p>
        <p className="text-sm text-foregroundAccent md:w-1/2 py-2">
          Invite employee to the app in order to access <Recurring />
        </p>
        <Button onClick={sendInvitation} disabled={loading}>
          {loading ? "Loading" : "Send Invitation"}
        </Button>
      </div>

      <div className="border p-5 rounded-lg mt-5">
        <p>Employee Termination</p>
        <p className="text-sm text-foregroundAccent md:w-1/2 py-2">
          Terminate the employee to the app in order to revoke the access to{" "}
          <Recurring />
        </p>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Terminate Employee</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Termination</DialogTitle>
              <DialogDescription>
                This action can't be undone are you sure about the termination?
              </DialogDescription>
            </DialogHeader>
            <TerminationForm setIsModalOpen={setIsModalOpen} id={id} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SettingsPage;
