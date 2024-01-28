import InputWithIcon from "@/components/custom/InputWithIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import { AiOutlineCheck, AiOutlineUser } from "react-icons/ai";
import { format } from "date-fns";
import EditButton from "./EditButton";

const page = async () => {
  const user = await checkUserWithoutRedirect();

  return (
    <div className="md:px-10 md:py-5 w-full">
      <div className="md:flex gap-5 md:w-1/2">
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">First Name</p>
          </Label>
          <Input
            placeholder="First Name"
            defaultValue={user && user.firstName}
            className="bg-backgroundAccent"
          />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Last Name</p>
          </Label>
          <Input
            placeholder="Last Name"
            defaultValue={user && user.lastName}
            className="bg-backgroundAccent"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Username</p>
        </Label>
        <InputWithIcon
          icon={<AiOutlineUser />}
          placeholder="Username"
          field={{ defaultValue: user && user.username }}
        />
      </div>

      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Phone Number</p>
        </Label>
        <Input
          placeholder="Phone Number"
          defaultValue={user && user.phoneNumber}
          className="bg-backgroundAccent"
        />
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Date of Birth</p>
        </Label>
        <Input
          placeholder="Date of Birth"
          defaultValue={
            user &&
            user.dateOfBirth &&
            format(new Date(user.dateOfBirth), "MMMM d, yyyy")
          }
          className="bg-backgroundAccent"
        />
      </div>
      <div className="md:w-1/2">
        <Label>
          <p className="pt-5 pb-2">Role</p>
        </Label>
        <Input
          placeholder="Role"
          defaultValue={user && user.role}
          className="bg-backgroundAccent capitalize"
        />
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
      <EditButton user={user} />
    </div>
  );
};

export default page;
