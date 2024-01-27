"use client";
import { logout } from "@/client/logout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BackToHome = () => {
  const router = useRouter();

  return <Button onClick={() => logout(router)}>Back to Home</Button>;
};

export default BackToHome;
