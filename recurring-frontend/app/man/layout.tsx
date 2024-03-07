import { checkUserWithoutRedirectInManager } from "@/server/checkUserWithoutRedirectInManager";
import StoreProvider from "../lib/StoreProvider";
import ManagerSideBar from "@/components/common/SidebarManager";
import UserContextWrapper from "@/components/common/chat/UserProvider/UserContextWrapper";
import SidebarManagerMobile from "@/components/common/SidebarManagerMobile";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUserWithoutRedirectInManager();
  return (
    <section className="md:flex md:h-screen">
      <ManagerSideBar />
      <SidebarManagerMobile />
      <UserContextWrapper user={user}>
        <StoreProvider>{children}</StoreProvider>
      </UserContextWrapper>
    </section>
  );
}
