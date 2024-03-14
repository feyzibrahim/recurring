import SideBar from "@/components/common/SideBar";
import StoreProvider from "../lib/StoreProvider";
import UserContextWrapper from "@/components/common/chat/UserProvider/UserContextWrapper";
import SideBarMobile from "@/components/common/SideBarMobile";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await checkUserWithoutRedirect();
  return (
    <section className="md:flex md:h-screen">
      <SideBar />
      <SideBarMobile />
      <UserContextWrapper>
        <StoreProvider>{children}</StoreProvider>
      </UserContextWrapper>
    </section>
  );
}
