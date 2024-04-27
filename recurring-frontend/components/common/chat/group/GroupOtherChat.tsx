import { MessageTypes } from "@/constants/Types";
import { format } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserAvatar from "../../UserAvatar";
import ImageColumns from "../ImageColumns";
import VideoColumns from "../VideoColumns";
import FileColumns from "../FileColumns";

interface PropsTypes {
  message: MessageTypes;
  prevMessage: MessageTypes;
}

const GroupOtherChat = ({ message, prevMessage }: PropsTypes) => {
  const prevUser = prevMessage
    ? typeof prevMessage.from !== "string" && prevMessage.from
    : false;
  const user = message
    ? typeof message.from !== "string" && message.from
    : false;

  return (
    <div className="flex gap-2">
      {prevUser !== false && user !== false && prevUser._id !== user._id && (
        <UserAvatar profileImageURL={user.profileImageURL as string} />
      )}
      {prevUser === false && user !== false && (
        <UserAvatar profileImageURL={user.profileImageURL as string} />
      )}
      <div>
        <p className="mb-1">
          {prevUser !== false &&
            user !== false &&
            prevUser._id !== user._id &&
            `${user.firstName} ${user.lastName}`}
          {prevUser === false &&
            user !== false &&
            `${user.firstName} ${user.lastName}`}
        </p>
        <div
          className={`flex items-center gap-2 mb-1 ${
            prevUser === false
              ? ""
              : user !== false && prevUser._id !== user._id
              ? ""
              : "ml-12"
          }`}
        >
          <div
            className={`bg-backgroundAccent w-fit ${
              message.type === "text" && "flex items-end"
            } gap-2 rounded-tr-lg rounded-b-lg  max-w-96`}
          >
            {message.type === "text" && (
              <p className="p-2">{message.content}</p>
            )}
            {message.type === "image" && (
              <div
                className={`p-2 ${
                  typeof message.content !== "string" &&
                  message.content.length > 1
                    ? "grid"
                    : ""
                } grid-cols-2 gap-2`}
              >
                {typeof message.content !== "string" &&
                  message.content
                    .slice(0, 4)
                    .map((val: string, index: number) => {
                      return (
                        typeof message.content !== "string" && (
                          <ImageColumns
                            images={message.content}
                            currentImageNumber={index}
                            key={index}
                          />
                        )
                      );
                    })}
              </div>
            )}
            {message.type === "video" && (
              <div
                className={`p-2 ${
                  typeof message.content !== "string" &&
                  message.content.length > 1
                    ? "grid"
                    : ""
                } grid-cols-2 gap-2`}
              >
                {typeof message.content !== "string" &&
                  message.content
                    .slice(0, 4)
                    .map((val: string, index: number) => {
                      return (
                        typeof message.content !== "string" && (
                          <VideoColumns
                            currentVideoNumber={index}
                            videos={message.content}
                          />
                        )
                      );
                    })}
              </div>
            )}
            {message.type === "file" && (
              <div
                className={`p-2 ${
                  typeof message.content !== "string" &&
                  message.content.length > 1
                    ? "grid"
                    : ""
                } grid-cols-2 gap-2`}
              >
                {typeof message.content !== "string" &&
                  message.content
                    .slice(0, 4)
                    .map((val: string, index: number) => {
                      return (
                        typeof message.content !== "string" && (
                          <FileColumns
                            currentFileNumber={index}
                            files={message.content}
                            key={index}
                          />
                        )
                      );
                    })}
              </div>
            )}
            <p
              className={`text-xs text-foregroundAccent pr-2 pb-1 ${
                message.type === "text" ? "" : "text-right"
              }`}
            >
              {format(message.createdAt, "hh:mm:a")}
            </p>
          </div>
          <BsThreeDotsVertical className="text-xl cursor-pointer text-backgroundAccent hover:text-foregroundAccent" />
        </div>
      </div>
    </div>
  );
};

export default GroupOtherChat;
