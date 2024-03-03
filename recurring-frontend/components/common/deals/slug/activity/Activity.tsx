"use client";

import { useAppSelector } from "@/app/lib/hook";
import ActivityAddButton from "./ActivityAddButton";
import EmptyFolder from "@/components/empty/EmptyFolder";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";
import ActivityEditButton from "./ActivityEditButton";

interface Props {
  slug: string;
}

const Activity = ({ slug }: Props) => {
  const { deal } = useAppSelector((state) => state.deal);
  const { user } = useContext(UserContext);
  const reversedActivity =
    deal && deal.activity ? [...deal.activity].reverse() : [];

  return (
    <div>
      <div className="flex justify-between py-2">
        <h1 className="text-2xl font-bold">Deal Activities</h1>
        <ActivityAddButton slug={slug} />
      </div>
      {reversedActivity.length > 0 ? (
        reversedActivity.map((activity, index) => (
          <div className="border rounded-md p-5 mb-3 relative" key={index}>
            <h3 className="font-semibold text-lg">{activity.title}</h3>
            <p className="text-xs text-foregroundAccent flex items-center gap-2">
              <FiCalendar />
              {format(activity.updatedAt, "MMM, dd, yyyy | hh:mm:aaa")}
            </p>
            <p className="text-sm pt-2">{activity.description}</p>
            {user?._id === activity.user && (
              <ActivityEditButton slug={slug} activity={activity} />
            )}
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-center">
          <div className="flex flex-col items-center">
            <EmptyFolder />
            <p className="pt-5">No activity added so far</p>
            <p className="text-foregroundAccent text-xs pt-1">
              Be the first to add an activity for this deal
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
