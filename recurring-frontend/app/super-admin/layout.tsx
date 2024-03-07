import SideBar from "@/components/common/SideBar";
import StoreProvider from "../lib/StoreProvider";
import SideBarSuperAdmin from "@/components/common/SideBarSuperAdmin";
import SideBarSuperAdminMobile from "@/components/common/SidebarSuperAdminMobile";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="md:flex md:h-screen">
      <SideBarSuperAdmin />
      <SideBarSuperAdminMobile />
      <StoreProvider>{children}</StoreProvider>
    </section>
  );
}
