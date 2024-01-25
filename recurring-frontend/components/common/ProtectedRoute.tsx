"use client";
import { useAppSelector } from "@/app/lib/hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return <>{children}</>;
};

export default ProtectedRoute;
