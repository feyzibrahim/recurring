import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmptyMessage from "@/components/empty/EmptyMessage";

const page = () => {
  return (
    <div className="md:px-10 md:py-5 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Chat</h1>
        <Link href="employee/create">
          <Button>Add Chat</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <EmptyMessage />
        <p className="mt-2">No Chats where created</p>
        <p className="text-sm py-2">Please Create One</p>
        <Link href="employee/create">
          <Button>Create Chat</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
