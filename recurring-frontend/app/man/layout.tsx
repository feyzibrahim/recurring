import { checkUserWithoutRedirectInManager } from "@/server/checkUserWithoutRedirectInManager";
import StoreProvider from "../lib/StoreProvider";
import ManagerSideBar from "@/components/common/SidebarManager";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkUserWithoutRedirectInManager();
  return (
    <section className="md:flex md:h-screen">
      <ManagerSideBar />
      <StoreProvider>{children}</StoreProvider>
    </section>
  );
}
