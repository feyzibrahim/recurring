import SettingsNav from "@/components/common/SettingsNav";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import UserAvatar from "../../../public/img/user-avatar.png";
import Image from "next/image";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUserWithoutRedirect();

  return (
    <section className="min-h-screen p-5 w-full overflow-y-auto">
      <div className="h-48 overflow-clip w-full bg-slate-400">
        <img
          src={
            "https://img.freepik.com/premium-photo/gradient-banner-background-image-jpg-gradient-background-header_873925-53376.jpg"
          }
          alt="Background in settings"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-backgroundAccent rounded-lg shadow-md w-full md:px-10 -mt-10">
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
    </section>
  );
}
