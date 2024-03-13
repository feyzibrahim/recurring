import { actualServerCommonRequest } from "@/api/actual_server";
import CurrentPlanBenefits from "./components/CurrentPlanBenefits";
import CurrentSubscriptionPlan from "./components/CurrentSubscriptionPlan";
import NextInvoice from "./components/NextInvoice";
import { API_ROUTES } from "@/lib/routes";
import InvoiceTable from "./components/InvoiceTable";

const page = async () => {
  const res = await actualServerCommonRequest({
    route: API_ROUTES.SUBSCRIPTION_SERVER,
    method: "GET",
    url: "/api/subscription",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="py-5 w-full">
      <div className="px-5 grid grid-cols-1 md:grid-cols-7 space-y-5 md:space-y-0 md:space-x-5">
        <CurrentSubscriptionPlan product={res.product} />
        <NextInvoice subscription={res.subscription} />
        <CurrentPlanBenefits product={res.product} />
      </div>
      <InvoiceTable data={res.invoices && res.invoices.data} />
    </div>
  );
};

export default page;
