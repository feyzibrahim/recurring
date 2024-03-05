import Recurring from "@/components/common/Recurring";
import React from "react";

interface Props {
  product: any;
}

const CurrentPlanBenefits = ({ product }: Props) => {
  return (
    <div className="text-sm bg-backgroundAccent p-7 rounded-md col-span-3">
      <p className="uppercase">Current Plan benefits</p>
      <p className="text-foregroundAccent py-2">
        {product
          ? product.metadata.description
          : `With free plan you only get limited features of ${(
              <Recurring />
            )} checkout
        the features of other plans`}
      </p>
      <div className="bg-border h-1 w-full rounded-full my-3"></div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        {product ? (
          product.features.map((feat: { name: string }, index: number) => (
            <p key={index}>✅ {feat.name}</p>
          ))
        ) : (
          <>
            <p>✅ 5 Employee</p>
            <p>✅ 5 Projects</p>
            <p>✅ In-app Chat</p>
            <p>✅ 2 Department</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentPlanBenefits;
