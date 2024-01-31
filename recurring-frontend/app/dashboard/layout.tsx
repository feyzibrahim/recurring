import SideBar from "@/components/common/SideBar";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import StoreProvider from "../lib/StoreProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkUserWithoutRedirect();
  return (
    <section className="md:flex md:h-screen md:overflow-hidden">
      <SideBar />
      <StoreProvider>{children}</StoreProvider>
    </section>
  );
}
