import { ScrollArea } from "@/components/ui/scroll-area";
import UserList from "./components/UserList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <ScrollArea className="w-full h-screen">
      <Tabs defaultValue="users" className="pt-5 w-full">
        <TabsList className="mx-5 bg-backgroundAccent">
          <TabsTrigger value="users">Admins</TabsTrigger>
          <TabsTrigger value="managers">Managers</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserList title="Admins" type="owner" />
        </TabsContent>
        <TabsContent value="managers">
          <UserList title="Managers" type="manager" />
        </TabsContent>
        <TabsContent value="employees">
          <UserList title="Employees" type="employee" />
        </TabsContent>
      </Tabs>
    </ScrollArea>
  );
};

export default page;
