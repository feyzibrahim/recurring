import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectTiles from "./ProjectTiles";
import ProjectTable from "./ProjectTable";

const ProjectList = () => {
  return (
    <Tabs defaultValue="table" className="pt-5">
      <TabsList className="mx-5 bg-backgroundAccent">
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="tiles">Tiles</TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <ProjectTable />
      </TabsContent>
      <TabsContent value="tiles">
        <ProjectTiles />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectList;
