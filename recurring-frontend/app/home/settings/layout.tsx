import { checkUserWithoutRedirectInHome } from "@/server/checkUserWithoutRedirectInHome";
import UserAvatar from "../../../public/img/user-avatar.png";
import ProfileBanner from "../../../public/profile_banner.png";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import SettingsNav from "@/components/common/SettingsNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUserWithoutRedirectInHome();

  return (
    <ScrollArea className="h-screen overflow-clip w-full">
      <div className="h-48 overflow-clip m-5">
        <Image
          src={ProfileBanner}
          alt="Background in settings"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-backgroundAccent rounded-lg shadow-md md:px-10 -mt-10 mx-5">
        <div className="flex items-center mb-4">
          <div className="w-28 h-28 rounded-full mr-4 overflow-clip bg-background border-8 border-backgroundAccent">
            <Image
              src={(user && user.profileImageURL) || UserAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <div className="pt-5">
            <p className="text-3xl font-semibold ">Settings</p>
          </div>
        </div>

        <SettingsNav />
      </div>
      {children}
    </ScrollArea>
  );
}
