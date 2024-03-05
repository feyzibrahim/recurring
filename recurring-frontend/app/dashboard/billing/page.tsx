import { actualServerCommonRequest } from "@/api/actual_server";
import CurrentPlanBenefits from "./components/CurrentPlanBenefits";
import CurrentSubscriptionPlan from "./components/CurrentSubscriptionPlan";
import NextInvoice from "./components/NextInvoice";
import { API_ROUTES } from "@/lib/routes";

const page = async () => {
  const res = await actualServerCommonRequest({
    route: API_ROUTES.SUBSCRIPTION,
    method: "GET",
    url: "/api/subscription",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="p-5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-7 space-y-5 md:space-y-0 md:space-x-5">
        <CurrentSubscriptionPlan product={res.product} />
        <NextInvoice subscription={res.subscription} />
        <CurrentPlanBenefits product={res.product} />
      </div>
      {/* <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Billing</h1>
        <Link href="employee/create">
          <Button>Add Billing</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <EmptyBill />
        <p className="mt-2">No Billings where created</p>
        <p className="text-sm py-2">Please Create One</p>
        <Link href="employee/create">
          <Button>Create Billing</Button>
        </Link>
      </div> */}
    </div>
  );
};

export default page;
