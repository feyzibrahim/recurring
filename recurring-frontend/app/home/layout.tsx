import EmployeeSidebar from "@/components/common/EmployeeSidebar";
import { checkUserWithoutRedirectInHome } from "@/server/checkUserWithoutRedirectInHome";
import StoreProvider from "../lib/StoreProvider";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkUserWithoutRedirectInHome();
  return (
    <section className="md:flex md:min-h-screen">
      <EmployeeSidebar />
      <StoreProvider>{children}</StoreProvider>
    </section>
  );
}
