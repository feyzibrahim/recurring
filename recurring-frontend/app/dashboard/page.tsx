"use client";
import { useAppDispatch, useAppSelector } from "../lib/hook";

const page = () => {
  const { user, loading, error } = useAppSelector((state) => state.user);
  console.log("Log: Dashboard -> user", user);

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <h1>Hello world {user.username}</h1>
    </div>
  );
};

export default page;
