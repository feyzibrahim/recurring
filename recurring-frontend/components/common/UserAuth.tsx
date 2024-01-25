"use client";
import { loadUser } from "@/app/lib/features/user/userActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect, useState } from "react";

type UserAuthProps = {
  children: ReactNode;
};

const UserAuth = ({ children }: UserAuthProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.user);
  const [test, setLoading] = useState<Boolean>(true);

  useLayoutEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      dispatch(loadUser());
    }
    setLoading(false);
  }, [user]);

  if (test || loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserAuth;
