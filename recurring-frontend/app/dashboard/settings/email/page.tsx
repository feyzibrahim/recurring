import InputWithIcon from "@/components/custom/InputWithIcon";
import { Label } from "@/components/ui/label";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import { AiOutlineMail } from "react-icons/ai";

const page = async () => {
  await checkUserWithoutRedirect();

  return (
    <div className="md:px-10 md:py-5 w-full">
      <div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Email</p>
          </Label>
          <InputWithIcon
            icon={<AiOutlineMail />}
            placeholder="You email"
            field={{ value: "feyzibrahim@gmail.com" }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
