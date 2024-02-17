import { BsThreeDotsVertical } from "react-icons/bs";

interface MessageTypes {
  message: string;
}

const OtherChat = ({ message }: MessageTypes) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="bg-backgroundAccent w-fit flex items-end gap-2 rounded-tr-lg rounded-b-lg  max-w-96">
          <p className="p-2">{message}</p>
          <p className="text-xs text-foregroundAccent pr-2">10:30AM</p>
        </div>
        <BsThreeDotsVertical className="text-xl cursor-pointer text-backgroundAccent hover:text-foregroundAccent" />
      </div>
    </div>
  );
};

export default OtherChat;
