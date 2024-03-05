import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  return (
    <div className="h-screen p-5">
      <div className="flex gap-5">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Skeleton className="h-48 w-72 bg-backgroundAccent shadow-lg" />
            <Skeleton className="h-48 w-72 bg-backgroundAccent shadow-lg" />
            <Skeleton className="h-48 w-72 bg-backgroundAccent shadow-lg" />
          </div>
          <Skeleton className="h-80 w-[900px] mt-5 bg-backgroundAccent shadow-lg" />
        </div>
        <Skeleton className="h-96 w-72 bg-backgroundAccent shadow-lg" />
      </div>
    </div>
  );
};

export default page;
