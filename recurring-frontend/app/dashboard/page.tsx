import EmptyProject from "@/components/empty/EmptyProjects";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToolTipWrapper } from "@/components/custom/ToolTipWrapper";
import { AiOutlineDashboard } from "react-icons/ai";

const page = async () => {
  await checkUserWithoutRedirect();

  return (
    <div className="min-h-screen p-10 w-full">
      <div className="flex flex-col items-center justify-center h-full">
        <EmptyProject />
        <p className="mt-2">Dashboard Yet To be designed</p>
        <p className="text-sm py-2">Will be updated Later</p>
        <ToolTipWrapper title="Add to library">
          <AiOutlineDashboard className="m-1" />
        </ToolTipWrapper>
      </div>
    </div>
  );
};

export default page;
