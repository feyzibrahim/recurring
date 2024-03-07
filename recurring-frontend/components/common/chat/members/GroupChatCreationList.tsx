"use client";
import { actualCommonRequest } from "@/api/actual_client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EmployeeTypes } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import UserAvatar from "@/public/img/user-avatar.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { FiSearch } from "react-icons/fi";
import MembersListLoading from "@/components/common/MembersListLoading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserContext } from "../UserProvider/UserContextProvider";
import PhotoUpload from "../../PhotoUpload";
import { photoUpload } from "@/util/functions";

export default function GroupChatCreationList({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [showGroupMemberSelection, setShowGroupMemberSelection] =
    useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, socket } = useContext(UserContext);

  const [membersList, setMembersList] = useState<
    (EmployeeTypes & { selected?: boolean })[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await actualCommonRequest({
        route: API_ROUTES.AUTH,
        method: "GET",
        url: "/api/user/in-org-without-me",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      if (!res.success) {
        setError(res.error);
      }

      if (res.users) {
        const membersWithSelection: (EmployeeTypes & { selected?: boolean })[] =
          res.users.map((member: EmployeeTypes) => ({
            ...member,
            selected: false,
          }));
        setMembersList(membersWithSelection);
      }
    };
    loadData();
  }, []);

  const handleCheckboxChange = (id: string) => {
    const updatedMembers = membersList.map((member) =>
      member._id === id ? { ...member, selected: !member.selected } : member
    );
    setMembersList(updatedMembers);
  };

  const handleCreateGroup = async () => {
    setSubmitLoading(true);
    const profileImageURL = selectedFile && (await photoUpload(selectedFile));

    const selectedMembers = membersList.filter((member) => member.selected);

    const selectedMembersId = selectedMembers.map((member) => {
      let mem = member.selected;
      return mem && member._id;
    });

    let chatData = {
      from: user?._id,
      participants: selectedMembersId,
      organization: user?.organization,
      groupName: groupName,
      groupProfile: profileImageURL,
      groupDescription: groupDescription,
    };

    socket && socket.emit("new-group-chat", chatData);
    setSubmitLoading(false);
    setIsModalOpen(false);
  };

  const handleGroupDescriptionButton = () => {
    if (!groupName || groupName.trim() === "") {
      return;
    }
    setShowGroupMemberSelection(true);
  };

  return (
    <div>
      {!showGroupMemberSelection ? (
        <div>
          <div className="flex gap-5 pb-2">
            <PhotoUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              size="20"
            />
            <div className="space-y-5">
              <Input
                placeholder="Group Name"
                className="bg-secondary"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Textarea
                placeholder="Group Description"
                className="bg-secondary h-48"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
              />
            </div>
          </div>
          <Button className="w-full" onClick={handleGroupDescriptionButton}>
            Select Members
          </Button>
        </div>
      ) : (
        <>
          <InputWithIcon icon={<FiSearch />} placeholder="Search..." />
          <ScrollArea className="h-60 py-2">
            {loading ? (
              <MembersListLoading />
            ) : (
              membersList.map((member, index: number) => (
                <label
                  htmlFor={`member_${member._id}`}
                  className="cursor-pointer"
                  key={index}
                >
                  <div
                    key={member._id}
                    className="flex items-center space-x-4 p-2 hover:bg-backgroundAccent active:opacity-80"
                  >
                    <Checkbox
                      id={`member_${member._id}`}
                      checked={member.selected}
                      onCheckedChange={() => handleCheckboxChange(member._id)}
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full overflow-clip">
                        <Image
                          src={member.profileImageURL || UserAvatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div>
                        <p>
                          {member.firstName} {member.lastName}
                        </p>
                        <p>{member.email}</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))
            )}
          </ScrollArea>
          {error && <p>Error: {error}</p>}
          <Button
            className="w-full mt-2"
            onClick={handleCreateGroup}
            variant="secondary"
            disabled={submitLoading}
          >
            {submitLoading ? "Loading..." : "Create Group"}
          </Button>
        </>
      )}
    </div>
  );
}
