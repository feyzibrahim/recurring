"use client";

import { FormLabel } from "@/components/ui/form";
import { useState } from "react";
import MemberAddButton from "./MemberAddButton";

interface MemberType {
  name: string;
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
              <td className="border-t border-background p-3">{member.name}</td>
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
              <MemberAddButton />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
