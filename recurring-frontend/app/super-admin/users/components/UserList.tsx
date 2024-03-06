"use client";
import { getUsers } from "@/app/lib/features/user/userActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import EmptyFolder from "@/components/empty/EmptyFolder";
import { useEffect } from "react";
import { columns } from "./userColumns";

interface Props {
  type: string;
  title: string;
}

const UserList = ({ type, title }: Props) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers({ query: type }));
  }, [dispatch]);

  return (
    <div className="">
      {users && users.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={users}
          pageTitle={title}
          searchField="email"
          //   rowOnCLick={rowOnCLick}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <EmptyFolder />
          <p className="mt-2">No users are created yet!</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
