import UserAvatar from "@/public/img/user-avatar.png";
import ProfileBanner from "@/public/profile_banner.png";
import Image from "next/image";

export default async function EmployeeProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen p-5 w-full overflow-y-auto">
      <div className="h-48 overflow-clip w-full bg-slate-400">
        <Image
          src={ProfileBanner}
          alt="Background in settings"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-backgroundAccent w-full md:px-5">
        <p className="text-3xl font-semibold py-5">Employee Details</p>
      </div>
      {children}
    </section>
  );
}
