import SideBar from "@/components/common/SideBar";
import StoreProvider from "../lib/StoreProvider";
import SideBarSuperAdmin from "@/components/common/SideBarSuperAdmin";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="md:flex md:h-screen">
      <SideBarSuperAdmin />
      <StoreProvider>{children}</StoreProvider>
    </section>
  );
}
