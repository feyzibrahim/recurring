"use client";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { Label } from "@/components/ui/label";
import { AiOutlineCheck } from "react-icons/ai";
import { format } from "date-fns";
import EditButton from "../../app/dashboard/settings/EditButton";
import InputBox from "@/components/common/InputBox";
import { useContext } from "react";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";

const UserForm = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>No user data</div>;
  }

  return (
    <div className="md:px-10 pb-5 w-full">
      <div className="md:flex gap-5 md:w-1/2">
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">First Name</p>
          </Label>
          <InputBox data={user && user.firstName} />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Last Name</p>
          </Label>
          <InputBox data={user && user.lastName} />
        </div>
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Username</p>
        </Label>
        <InputBox data={user && user.username} />
      </div>

      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Phone Number</p>
        </Label>
        <InputBox data={user && user.phoneNumber} />
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Date of Birth</p>
        </Label>
        <InputBox
          data={
            user &&
            user.dateOfBirth &&
            format(new Date(user.dateOfBirth), "MMMM d, yyyy")
          }
        />
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Role</p>
        </Label>
        <InputBox data={user && user.role} />
      </div>
      <div className="md:w-1/2 mb-5">
        <Label>
          <p className="pt-5 pb-2">Email Verification</p>
        </Label>
        <InputWithIcon
          icon={<AiOutlineCheck className="text-green-500" />}
          placeholder="Email Verification status"
          field={{
            defaultValue:
              user && user.isEmailVerified ? "Verified" : "Not Verified",
          }}
        />
      </div>
      <EditButton />
    </div>
  );
};

export default UserForm;
