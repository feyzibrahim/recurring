"use client";
import { actualCommonRequest } from "@/api/actual_client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EmployeeTypes } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import UserAvatar from "@/public/img/user-avatar.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { FiSearch } from "react-icons/fi";
import MembersListLoading from "./MembersListLoading";

export default function MembersList({
  setIsModalOpen,
  setMembers,
}: {
  setIsModalOpen: any;
  setMembers: any;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [membersList, setMembersList] = useState<
    (EmployeeTypes & { selected?: boolean })[]
  >([]);
  const { setValue } = useFormContext();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await actualCommonRequest({
        route: API_ROUTES.EMPLOYEE,
        method: "GET",
        url: "/api/employee/with-role?role=employee",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      if (res.employees) {
        const membersWithSelection: (EmployeeTypes & { selected?: boolean })[] =
          res.employees.map((member: EmployeeTypes) => ({
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

  const handleAddMembers = () => {
    const selectedMembers = membersList.filter((member) => member.selected);
    console.log(
      "file: MembersList.tsx:66 -> handleAddMembers -> selectedMembers",
      selectedMembers
    );
    const selectedMembersId = membersList.map((member) => {
      let mem = member.selected;
      return mem && member._id;
    });

    setValue("members", selectedMembersId);

    setMembers(selectedMembers);
    setIsModalOpen(false);
  };

  return (
    <div>
      <InputWithIcon icon={<FiSearch />} placeholder="Search..." />
      <ScrollArea className="h-52 py-2">
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
      <Button className="w-full mt-5" onClick={handleAddMembers}>
        Add Members
      </Button>
    </div>
  );
}
