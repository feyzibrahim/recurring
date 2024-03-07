import { Skeleton } from "@/components/ui/skeleton";

const MembersListLoading = () => {
  return (
    <div className="p-2">
      <div className="flex items-center gap-3 mt-5">
        <Skeleton className="w-10 h-10 rounded-full bg-backgroundAccent" />
        <div>
          <Skeleton className="w-36 h-4 rounded-md bg-backgroundAccent" />
          <Skeleton className="w-52 h-4 rounded-md mt-1 bg-backgroundAccent" />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <Skeleton className="w-10 h-10 rounded-full bg-backgroundAccent" />
        <div>
          <Skeleton className="w-36 h-4 rounded-md bg-backgroundAccent" />
          <Skeleton className="w-52 h-4 rounded-md mt-1 bg-backgroundAccent" />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <Skeleton className="w-10 h-10 rounded-full bg-backgroundAccent" />
        <div>
          <Skeleton className="w-36 h-4 rounded-md bg-backgroundAccent" />
          <Skeleton className="w-52 h-4 rounded-md mt-1 bg-backgroundAccent" />
        </div>
      </div>
    </div>
  );
};

export default MembersListLoading;
