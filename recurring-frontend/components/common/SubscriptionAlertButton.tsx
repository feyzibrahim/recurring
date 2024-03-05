import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrganizationTypes } from "@/constants/Types";
import SubscriptionAlertDialog from "./SubscriptionAlertDialog";
import { ReactNode } from "react";

interface Props {
  organization: OrganizationTypes;
  validationLength: number;
  title: string;
  subTitle: string;
  url: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  activeButton?: ReactNode;
  nonActiveButton?: ReactNode;
}

const SubscriptionAlertButton = ({
  organization,
  validationLength,
  title,
  subTitle,
  url,
  variant,
  activeButton,
  nonActiveButton,
}: Props) => {
  if (organization.subscriptionType === "Free" && validationLength >= 5) {
    return (
      <SubscriptionAlertDialog
        number="5"
        planTitle="Free"
        planOther="Pro"
        subTitle={subTitle}
        title={title}
        nonActiveButton={nonActiveButton}
      />
    );
  }

  if (organization.subscriptionType === "Pro" && validationLength >= 20) {
    return (
      <SubscriptionAlertDialog
        number="20"
        planTitle="Pro"
        planOther="Business"
        subTitle={subTitle}
        title={title}
        nonActiveButton={nonActiveButton}
      />
    );
  }

  if (activeButton) {
    return activeButton;
  }

  return (
    <Link href={url}>
      <Button variant={variant ?? "default"}>Create New {title}</Button>
    </Link>
  );
};

export default SubscriptionAlertButton;
