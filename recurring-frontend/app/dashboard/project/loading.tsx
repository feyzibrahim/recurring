import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  return (
    <div className="h-screen md:px-10 md:py-5 w-full">
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="h-8 w-36 bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-9 w-44 bg-backgroundAccent shadow-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-48 w-full bg-backgroundAccent shadow-lg" />
      </div>
    </div>
  );
};

export default page;
