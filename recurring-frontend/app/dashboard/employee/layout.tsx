import NavbarLogged from "@/components/common/NavbarLogged";
import EmployeeSidebar from "./EmployeeSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="md:flex w-full min-h-screen">
      <NavbarLogged />
      <EmployeeSidebar /> {children}
    </section>
  );
};

export default layout;
