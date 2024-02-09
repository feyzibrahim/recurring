"use client";
import { EmployeeTypes } from "@/constants/Types";
import Image from "next/image";
import { BiPhone } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import UserAvatar from "@/public/img/user-avatar.png";
import { useRouter } from "next/navigation";

const EmployeeCard = ({ employee }: { employee: EmployeeTypes }) => {
  const router = useRouter();
  return (
    <div
      className="bg-backgroundAccent p-5 rounded-lg cursor-pointer hover:opacity-80"
      onClick={() => router.push(`employee/${employee._id}`)}
    >
      <div className="text-center py-5">
        <div className="w-32 h-32 mx-auto rounded-full overflow-clip">
          <Image
            src={(employee && employee.profileImageURL) || UserAvatar}
            alt="profile image"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold">
          {employee && `${employee.firstName} ${employee.lastName}`}
        </h3>
        <div className="text-sm text-foregroundAccent">
          {employee && `${employee.role}`}
        </div>
      </div>
      <div>
        <div className="flex gap-3 items-center mb-2 line-clamp-1">
          <div className="p-2 bg-background rounded-md">
            <BiPhone />
          </div>
          {employee && `${employee.phoneNumber}`}
        </div>
        <div className="flex gap-3 items-center line-clamp-1">
          <div className="p-2 bg-background rounded-md">
            <HiOutlineMail />
          </div>
          {employee && `${employee.email}`}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
