import { FiSearch } from "react-icons/fi";
import InputWithIcon from "../custom/InputWithIcon";
import UserAvatar from "./UserAvatar";

const NavbarLogged = () => {
  return (
    <div className="w-full bg-secondary pr-20 py-2 flex justify-between fixed z-30">
      <div className="flex items-center justify-center w-full">
        <InputWithIcon placeholder="Search..." icon={<FiSearch />} />
      </div>
      <UserAvatar profileImageURL="" />
    </div>
  );
};

export default NavbarLogged;
