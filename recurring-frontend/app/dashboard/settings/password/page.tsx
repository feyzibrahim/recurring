import InputWithIcon from "@/components/custom/InputWithIcon";
import { Label } from "@/components/ui/label";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import { AiOutlineLock } from "react-icons/ai";

const page = async () => {
  await checkUserWithoutRedirect();

  return (
    <div className="md:px-10 md:py-5 w-full">
      <div>
        <h1>Change Password</h1>
        <p className="text-sm text-foregroundAccent md:w-1/2 py-2">
          Secure your account by updating your password regularly. Use the form
          below to set a new strong password.
        </p>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Old Password</p>
          </Label>
          <InputWithIcon
            icon={<AiOutlineLock />}
            placeholder="You password"
            field={{ value: "Faiz@1234" }}
            type="password"
          />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">New Password</p>
          </Label>
          <InputWithIcon
            icon={<AiOutlineLock />}
            placeholder="You password"
            field={{ value: "Faiz@1234" }}
            type="password"
          />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Confirm Password</p>
          </Label>
          <InputWithIcon
            icon={<AiOutlineLock />}
            placeholder="You password"
            field={{ value: "Faiz@1234" }}
            type="password"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
