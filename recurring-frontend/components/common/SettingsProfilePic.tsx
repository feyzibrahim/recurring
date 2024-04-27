"use client";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";
import { useContext } from "react";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";

const SettingsProfilePic = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-28 h-28 rounded-full mr-4 overflow-clip bg-background border-8 border-backgroundAccent">
      <Image
        src={(user && user.profileImageURL) || UserAvatar}
        alt="Profile"
        className="w-full h-full object-cover"
        width={100}
        height={100}
      />
    </div>
  );
};

export default SettingsProfilePic;
