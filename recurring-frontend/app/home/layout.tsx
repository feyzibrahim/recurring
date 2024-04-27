import EmployeeSidebar from "@/components/common/SidebarEmployee";
import StoreProvider from "../lib/StoreProvider";
import UserContextWrapper from "@/components/common/chat/UserProvider/UserContextWrapper";
import SidebarEmployeeMobile from "@/components/common/SidebarEmployeeMobile";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="md:flex md:min-h-screen">
      <EmployeeSidebar />
      <SidebarEmployeeMobile />
      <UserContextWrapper>
        <StoreProvider>{children}</StoreProvider>
      </UserContextWrapper>
    </section>
  );
}
