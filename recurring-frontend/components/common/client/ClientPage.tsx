import ClientDetails from "@/components/common/client/ClientDetails";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BiDetail } from "react-icons/bi";
import { MdDescription } from "react-icons/md";

interface Props {
  slug: string;
}

const ClientPage = ({ slug }: Props) => {
  return (
    <div className="pb-10">
      <Tabs defaultValue="details" className="pt-1">
        <ScrollArea className="max-w-[250px] sm:max-w-none">
          <TabsList className="mx-2 bg-backgroundAccent">
            <TabsTrigger value="details" className="flex items-center gap-1">
              <BiDetail />
              Details
            </TabsTrigger>
            <TabsTrigger
              value="description"
              className="flex items-center gap-1"
            >
              <MdDescription />
              Description
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <TabsContent value="details">
          <ClientDetails slug={slug} />
        </TabsContent>
        <TabsContent value="description">
          {/* <Activity slug={slug} /> */}
          <div>Hello world</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientPage;
