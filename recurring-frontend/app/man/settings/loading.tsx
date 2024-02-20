import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="md:px-10 md:py-5 w-full">
      <div className="md:flex gap-5 md:w-1/2">
        <div className="md:w-1/2">
          <Skeleton className="h-4 w-32 mt-5 mb-2 bg-backgroundAccent shadow-lg" />
          <Skeleton className="h-10 w-full bg-backgroundAccent shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <Skeleton className="h-4 w-32 mt-5 mb-2 bg-backgroundAccent shadow-lg" />
          <Skeleton className="h-10 w-full bg-backgroundAccent shadow-lg" />
        </div>
      </div>
      <div className="md:w-1/2">
        <Skeleton className="h-4 w-32 mt-5 mb-2 bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-10 w-full bg-backgroundAccent shadow-lg" />
      </div>
      <div className="md:w-1/2">
        <Skeleton className="h-4 w-32 mt-5 mb-2 bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-10 w-full bg-backgroundAccent shadow-lg" />
      </div>
      <div className="md:w-1/2">
        <Skeleton className="h-4 w-32 mt-5 mb-2 bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-10 w-full bg-backgroundAccent shadow-lg" />
      </div>
      <div className="md:w-1/2">
        <Skeleton className="h-4 w-32 mt-5 mb-2 bg-backgroundAccent shadow-lg" />
        <Skeleton className="h-10 w-full bg-backgroundAccent shadow-lg" />
      </div>
    </div>
  );
};

export default loading;
