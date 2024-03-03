import Recurring from "@/components/common/Recurring";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const CurrentSubscriptionPlan = () => {
  return (
    <div className="bg-secondary p-7 text-sm rounded-md col-span-2">
      <p className="uppercase">Current subscription plan</p>
      <h1 className="text-4xl font-bold py-2">🚀Free</h1>
      <p className="text-foregroundAccent py-2">
        Free plan doesn't give you all the benefits of <Recurring /> subscribe
        to Pro or Business to enjoy all benefits
      </p>
      <Link href="billing/plans">
        <Button>Upgrade Plan</Button>
      </Link>
    </div>
  );
};

export default CurrentSubscriptionPlan;
