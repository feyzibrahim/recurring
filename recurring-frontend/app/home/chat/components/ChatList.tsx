import InputWithIcon from "@/components/custom/InputWithIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { FiSearch } from "react-icons/fi";
import SeeAllButton from "./members/SeeAllButton";

const ChatList = () => {
  return (
    <div className="bg-secondary p-5">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold mb-2">Messages</h1>
        <SeeAllButton />
      </div>
      <InputWithIcon placeholder="search..." icon={<FiSearch />} />
      <ScrollArea className="h-[550px] py-5">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full bg-background shrink-0" />
          <div className="w-full">
            <Skeleton className="w-full h-4 rounded-sm bg-background mb-1" />
            <Skeleton className="w-1/2 h-4 rounded-sm bg-background" />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatList;
