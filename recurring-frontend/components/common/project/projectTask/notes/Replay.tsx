import UserAvatar from "@/components/common/UserAvatar";
import { ReplayTypes } from "@/constants/Types";
import { formatDistanceToNow } from "date-fns";
import React from "react";

interface Props {
  replay: ReplayTypes;
}

const Replay = ({ replay }: Props) => {
  if (typeof replay.user !== "string") {
    return (
      <div className="flex gap-2 mb-2">
        <UserAvatar
          profileImageURL={replay.user.profileImageURL as string}
          size="w-7 h-7"
        />
        <div className="w-full">
          <div className="bg-backgroundAccent rounded-md w-full p-2">
            <div className="flex gap-2 justify-between items-center">
              <p className="font-bold line-clamp-1">
                {replay.user.firstName} {replay.user.lastName}
              </p>
              <p className="text-xs text-foregroundAccent shrink-0">
                {formatDistanceToNow(new Date(replay.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <p className="pt-2">{replay.text}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Replay;
