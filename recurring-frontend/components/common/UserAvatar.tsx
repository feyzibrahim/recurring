import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiUser } from "react-icons/fi";

interface PropsTypes {
  profileImageURL: string;
  size?: string;
}

const UserAvatar = ({ profileImageURL, size }: PropsTypes) => {
  return (
    <Avatar className={size ? size : ""}>
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
