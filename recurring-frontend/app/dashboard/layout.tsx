import SideBar from "@/components/common/SideBar";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import StoreProvider from "../lib/StoreProvider";
import UserContextWrapper from "@/components/common/chat/UserProvider/UserContextWrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUserWithoutRedirect();
  return (
    <section className="md:flex md:h-screen">
      <SideBar />
      <UserContextWrapper user={user}>
        <StoreProvider>{children}</StoreProvider>
      </UserContextWrapper>
    </section>
  );
}
