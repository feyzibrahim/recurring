import EmployeeSidebar from "@/components/common/SidebarEmployee";
import { checkUserWithoutRedirectInHome } from "@/server/checkUserWithoutRedirectInHome";
import StoreProvider from "../lib/StoreProvider";
import UserContextWrapper from "@/components/common/chat/UserProvider/TaskContextWrapper";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUserWithoutRedirectInHome();
  return (
    <section className="md:flex md:min-h-screen">
      <EmployeeSidebar />
      <UserContextWrapper user={user}>
        <StoreProvider>{children}</StoreProvider>
      </UserContextWrapper>
    </section>
  );
}
