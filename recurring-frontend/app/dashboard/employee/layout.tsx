import EmployeeSidebar from "./EmployeeSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="md:flex w-full min-h-screen">
      <EmployeeSidebar /> {children}
    </section>
  );
};

export default layout;
