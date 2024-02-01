import EmployeeSidebar from "./EmployeeSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="md:flex md:h-screen md:overflow-hidden w-full">
      <EmployeeSidebar /> {children}
    </section>
  );
};

export default layout;
