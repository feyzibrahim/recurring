import Video from "@/components/common/chat/Video/Video";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import React from "react";

const page = async () => {
  const user = await checkUserWithoutRedirect();

  return (
    <div className="col-span-3 h-screen">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">Video Call</h1>
      </div>
      <Video user={user} />
    </div>
  );
};

export default page;
