import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiUser } from "react-icons/fi";

const UserAvatar = ({ profileImageURL }: { profileImageURL: string }) => {
  return (
    <Avatar>
      <AvatarImage src={profileImageURL} alt="@user" />
      <AvatarFallback>
        <AvatarFallback className="bg-backgroundAccent">
          <FiUser />
        </AvatarFallback>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
