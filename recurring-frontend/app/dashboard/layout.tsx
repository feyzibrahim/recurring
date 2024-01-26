import SideBar from "@/components/common/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="md:flex">
      <SideBar />
      {children}
    </section>
  );
}
