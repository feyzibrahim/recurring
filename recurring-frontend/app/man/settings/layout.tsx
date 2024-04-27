import SettingsNav from "@/components/common/SettingsNav";
import ProfileBanner from "@/public/profile_banner.png";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import SettingsProfilePic from "@/components/common/SettingsProfilePic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <SettingsProfilePic />
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
