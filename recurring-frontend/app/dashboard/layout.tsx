import SideBar from "@/components/common/SideBar";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkUserWithoutRedirect();
  return (
    <section className="md:flex md:h-screen md:overflow-hidden">
      <SideBar />
      {children}
    </section>
  );
}
