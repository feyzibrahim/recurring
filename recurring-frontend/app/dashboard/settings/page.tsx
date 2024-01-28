import InputWithIcon from "@/components/custom/InputWithIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import { AiOutlineCheck, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

const page = async () => {
  await checkUserWithoutRedirect();

  return (
    <div className="md:px-10 md:py-5 w-full">
      <div>
        <div className="md:flex gap-5 md:w-1/2">
          <div className="md:w-1/2">
            <Label>
              <p className="pt-5 pb-2">First Name</p>
            </Label>
            <Input
              placeholder="First Name"
              value="Feyz"
              className="bg-backgroundAccent"
            />
          </div>
          <div className="md:w-1/2">
            <Label>
              <p className="pt-5 pb-2">Last Name</p>
            </Label>
            <Input
              placeholder="Last Name"
              value="Ibrahim"
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
            field={{ value: "feyzibrahimx" }}
          />
        </div>

        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Phone Number</p>
          </Label>
          <Input
            placeholder="Phone Number"
            value="+917356983827"
            className="bg-backgroundAccent"
          />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Date of Birth</p>
          </Label>
          <Input
            placeholder="Date of Birth"
            value="+917356983827"
            className="bg-backgroundAccent"
          />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Role</p>
          </Label>
          <Input
            placeholder="Role"
            value="Owner"
            className="bg-backgroundAccent"
          />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Email Verification</p>
          </Label>
          <InputWithIcon
            icon={<AiOutlineCheck className="text-green-500" />}
            placeholder="Email Verification status"
            field={{ value: "Verified" }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
