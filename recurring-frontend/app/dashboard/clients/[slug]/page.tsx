import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import client_banner from "@/public/client_banner.png";
import ClientPage from "@/components/common/client/ClientPage";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="m-5 h-60 bg-backgroundAccent rounded-b-xl">
        <Image
          src={client_banner}
          alt="client_banner"
          className="h-48"
          width={1500}
          height={200}
        />
        <ClientPage slug={params.slug} />
      </div>
    </ScrollArea>
  );
};

export default page;
