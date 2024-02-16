"use client";
import { actualCommonRequest } from "@/api/actual_client";
import { EmployeeTypes } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserAvatar from "@/public/img/user-avatar.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useAppDispatch } from "@/app/lib/hook";
import { setActiveChatUser } from "@/app/lib/features/chat/chatSlice";

export default function MembersList({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

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
      console.log("file: AllMembers.tsx:50 -> loadData -> res", res);

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

  return (
    <div>
      <InputWithIcon icon={<FiSearch />} placeholder="Search..." />
      <ScrollArea className="h-72 py-2">
        {loading ? (
          <div>Loading</div>
        ) : (
          membersList.map((member, index: number) => (
            <label
              htmlFor={`member_${member._id}`}
              className="cursor-pointer"
              key={index}
            >
              <Link
                href={`/home/chat/user/${member.username}`}
                onClick={() => {
                  dispatch(setActiveChatUser({ user: member }));
                  setIsModalOpen();
                }}
              >
                <div
                  key={member._id}
                  className="flex items-center space-x-4 p-2 hover:bg-backgroundAccent active:opacity-80"
                >
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
                      <p className="text-sm text-foregroundAccent">
                        @{member.username}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </label>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
