import { ScrollArea } from "@/components/ui/scroll-area";
import EditForm from "./components/EditForm";
import BackButton from "@/components/common/BackButton";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">Edit Meeting</h1>
        <BackButton />
      </div>
      <EditForm slug={params.slug} />
    </ScrollArea>
  );
};

export default page;
