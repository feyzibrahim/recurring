"use client";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import { Button } from "@/components/ui/button";
import { logoutUser } from "../lib/features/user/userActions";

const page = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);
  console.log("Log: Dashboard -> user", user);

  return (
    <ProtectedRoute>
      <div className="h-screen flex items-center justify-center w-full">
        <h1>Hello world {user && user.username}</h1>
        <Button onClick={() => dispatch(logoutUser())}>Logout</Button>
      </div>
    </ProtectedRoute>
  );
};

export default page;
