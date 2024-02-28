import { MessageTypes } from "@/constants/Types";
import { format } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";

interface PropsTypes {
  message: MessageTypes;
}

const OtherChat = ({ message }: PropsTypes) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="bg-backgroundAccent w-fit flex items-end gap-2 rounded-tr-lg rounded-b-lg  max-w-96">
          <p className="p-2">{message.content || message.message}</p>
          <p className="text-xs text-foregroundAccent pr-2">
            {format(message.createdAt, "hh:mm:a")}
          </p>
        </div>
        <BsThreeDotsVertical className="text-xl cursor-pointer text-backgroundAccent hover:text-foregroundAccent" />
      </div>
    </div>
  );
};

export default OtherChat;
