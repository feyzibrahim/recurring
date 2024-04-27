"use client";
import CurrentPlanBenefits from "../components/CurrentPlanBenefits";
import CurrentSubscriptionPlan from "../components/CurrentSubscriptionPlan";
import NextInvoice from "../components/NextInvoice";
import { API_ROUTES } from "@/lib/routes";
import InvoiceTable from "../components/InvoiceTable";
import { useEffect, useState } from "react";
import { actualCommonRequest } from "@/api/actual_client";

const SubscriptionComponent = () => {
  const [res, setRes] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.SUBSCRIPTION,
        method: "GET",
        url: "/api/subscription",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.success) {
        setRes(res);
      } else {
        console.log(
          "file: SubscriptionComponent.tsx:24 -> loadData -> res",
          res
        );
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <div className="px-5 grid grid-cols-1 md:grid-cols-7 space-y-5 md:space-y-0 md:space-x-5">
        <CurrentSubscriptionPlan product={res ? res.product : null} />
        <NextInvoice subscription={res ? res.subscription : null} />
        <CurrentPlanBenefits product={res ? res.product : null} />
      </div>
      <InvoiceTable data={res && res.invoices && res.invoices.data} />
    </div>
  );
};

export default SubscriptionComponent;
