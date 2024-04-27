"use client";
import { Label } from "@/components/ui/label";
import { AiOutlineMail } from "react-icons/ai";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { useContext } from "react";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";

const EmailComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="md:w-1/2 mb-5">
      <Label>
        <p className="pt-5 pb-2">Email</p>
      </Label>
      <InputWithIcon
        icon={<AiOutlineMail />}
        placeholder="You email"
        field={{ defaultValue: user && user.email }}
      />
    </div>
  );
};

export default EmailComponent;
