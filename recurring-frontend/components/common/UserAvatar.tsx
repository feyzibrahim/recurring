import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarFallbackImage from "./AvatarFallbackImage";
import { FiUser } from "react-icons/fi";

const UserAvatar = ({ profileImageURL }: { profileImageURL: string }) => {
  return (
    <Avatar>
      <AvatarImage src={profileImageURL} alt="@user" />
      <AvatarFallback>
        <AvatarFallback className="bg-background">
          <FiUser />
        </AvatarFallback>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
