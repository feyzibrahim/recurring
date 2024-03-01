import { useAppSelector } from "@/app/lib/hook";
import React from "react";

const Details = () => {
  const { deal } = useAppSelector((state) => state.deal);

  return <>{deal && <div>{deal.title}</div>}</>;
};

export default Details;
