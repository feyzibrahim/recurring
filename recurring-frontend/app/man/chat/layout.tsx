import ChatList from "@/components/common/chat/ChatList";
import { checkUserWithoutRedirectInManager } from "@/server/checkUserWithoutRedirectInManager";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUserWithoutRedirectInManager();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 h-screen">
      <ChatList />
      {children}
    </div>
  );
}
