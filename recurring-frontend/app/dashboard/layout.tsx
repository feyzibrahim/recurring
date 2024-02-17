import SideBar from "@/components/common/SideBar";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import StoreProvider from "../lib/StoreProvider";
import NavbarLogged from "@/components/common/NavbarLogged";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkUserWithoutRedirect();
  return (
    <section className="md:flex md:h-screen">
      <SideBar />
      <StoreProvider>{children}</StoreProvider>
    </section>
  );
}
