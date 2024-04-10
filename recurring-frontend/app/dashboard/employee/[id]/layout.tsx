import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileBanner from "@/public/profile_banner.png";
import Image from "next/image";

export default async function EmployeeProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="px-5 h-48 w-full pt-16">
        <Image
          src={ProfileBanner}
          alt="Background in settings"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mx-5 px-5 bg-backgroundAccent">
        <p className="text-3xl font-semibold py-5">Employee Details</p>
      </div>
      {children}
    </ScrollArea>
  );
}
