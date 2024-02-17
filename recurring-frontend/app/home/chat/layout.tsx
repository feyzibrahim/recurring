import ChatList from "@/components/common/chat/ChatList";
import UserContextWrapper from "@/components/common/chat/UserProvider/TaskContextWrapper";
import { checkUserWithoutRedirectInHome } from "@/server/checkUserWithoutRedirectInHome";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUserWithoutRedirectInHome();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 h-screen">
      <UserContextWrapper user={user}>
        <ChatList />
        {children}
      </UserContextWrapper>
    </div>
  );
}
