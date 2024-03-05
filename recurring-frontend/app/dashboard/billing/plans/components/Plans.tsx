import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubCards from "./SubCards";

interface Props {
  subscription: any;
}

export default function Plans({ subscription }: Props) {
  return (
    <div className="text-center w-full">
      <h1 className="text-3xl font-bold">Choose Plan </h1>
      <h1 className="text-3xl font-bold">That&apos;s Right For You</h1>
      <p className="text-foregroundAccent py-5">
        Choose plan that works best for you, feel free to contact us
      </p>
      <Tabs defaultValue="monthly">
        <TabsList className="shadow-md">
          <TabsTrigger
            value="monthly"
            className="active:bg-blue-500 active:text-white"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly">yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <SubCards pro="49" business="399" subscription={subscription} />
        </TabsContent>
        <TabsContent value="yearly">
          <SubCards pro="499" business="3999" subscription={subscription} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
