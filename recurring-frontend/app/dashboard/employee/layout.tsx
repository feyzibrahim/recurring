import NavbarLogged from "@/components/common/NavbarLogged";
import EmployeeSidebar from "./EmployeeSidebar";
import { OrganizationTypes } from "@/constants/Types";
import { getOrganizationData } from "@/server/getOrganizationData";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const organization: OrganizationTypes = await getOrganizationData();

  return (
    <section className="md:flex w-full min-h-screen">
      <NavbarLogged />
      <EmployeeSidebar organization={organization} /> {children}
    </section>
  );
};

export default layout;
