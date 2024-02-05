"use client";

import { FormLabel } from "@/components/ui/form";
import { useState } from "react";
import MemberAddButton from "./MemberAddButton";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";

interface MemberType {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: number;
}

export function MemberTable() {
  const [members, setMembers] = useState<MemberType[]>([]);

  return (
    <div className="w-full text-sm mt-5">
      <FormLabel className="mb-2">Choose Members</FormLabel>
      <table className="w-full border-collapse my-2 bg-backgroundAccent rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="border-t border-background p-3">Name</th>
            <th className="border-t border-background p-3">Email</th>
            <th className="border-t border-background p-3">Username</th>
            <th className="border-t border-background p-3">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="border-t border-background p-3">
                <div className="flex gap-3 items-center">
                  <div className="w-7 h-7">
                    <Image
                      src={UserAvatar}
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
              <td className="border-t border-background p-3">
                {member.phoneNumber}
              </td>
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
