import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface Props {
  title: string;
  subTitle: string;
  number: string;
  planTitle: string;
  planOther: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  nonActiveButton?: ReactNode;
}

const SubscriptionAlertDialog = ({
  title,
  subTitle,
  number,
  planOther,
  planTitle,
  variant,
  nonActiveButton,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {nonActiveButton ? (
          nonActiveButton
        ) : (
          <Button variant={variant ?? "default"}>Create New {title}</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{planTitle} plan usage Exceeded</AlertDialogTitle>
          <AlertDialogDescription>
            For {planTitle} plan you can only create {number} {subTitle}. Please
            subscribe to {planOther} plan for creating more {subTitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Skip</AlertDialogCancel>
          <Link href="/dashboard/billing">
            <AlertDialogAction>Upgrade</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubscriptionAlertDialog;
