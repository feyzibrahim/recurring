"use client";
import { AiOutlineMail } from "react-icons/ai";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { useContext } from "react";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";

const EmailIInput = () => {
  const { user } = useContext(UserContext);

  return (
    <InputWithIcon
      icon={<AiOutlineMail />}
      placeholder="You email"
      field={{ defaultValue: user && user.email }}
    />
  );
};

export default EmailIInput;
