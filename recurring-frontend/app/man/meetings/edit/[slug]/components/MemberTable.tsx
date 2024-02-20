"use client";

import { FormLabel } from "@/components/ui/form";
import { useState } from "react";
import MemberAddButton from "./MemberAddButton";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";
import { EmployeeTypes } from "@/constants/Types";

export function MemberTable({
  membersFromServer,
}: {
  membersFromServer: EmployeeTypes[];
}) {
  const [members, setMembers] = useState<EmployeeTypes[]>(membersFromServer);

  return (
    <div className="w-full text-sm mt-5">
      <FormLabel className="mb-2">Choose Participants</FormLabel>
      <table className="w-full border-collapse my-2 bg-backgroundAccent rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="border-t border-background p-3">Name</th>
            <th className="border-t border-background p-3">Email</th>
            <th className="border-t border-background p-3">Username</th>
            {/* <th className="border-t border-background p-3">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="border-t border-background p-3">
                <div className="flex gap-3 items-center">
                  <div className="w-7 h-7 rounded-full overflow-clip">
                    <Image
                      src={member.profileImageURL || UserAvatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                  {member.firstName} {member.lastName}
                </div>
              </td>
              <td className="border-t border-background p-3">{member.email}</td>
              <td className="border-t border-background p-3">
                {member.username}
              </td>
              {/* <td className="border-t border-background p-3">
                <FiTrash className="hover:text-foregroundAccent cursor-pointer" />
              </td> */}
            </tr>
          ))}
          <tr>
            <td
              className="border-t border-background p-3 hover:opacity-50 cursor-pointer"
              colSpan={4}
            >
              <MemberAddButton setMembers={setMembers} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
