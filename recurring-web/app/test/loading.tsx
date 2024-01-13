import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="bg-background h-screen flex items-center justify-center dark">
      <Skeleton className="h-10 w-10 rounded-md"></Skeleton>
      <div className="flex flex-col gap-2 ml-5">
        <Skeleton className="h-4 w-36 rounded-md"></Skeleton>
        <Skeleton className="h-4 w-20 rounded-md"></Skeleton>
      </div>
    </div>
  );
}
