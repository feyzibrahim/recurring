"use client";
import { commonRequest } from "@/api/client";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

const GoogleAuth = () => {
  const router = useRouter();

  const googleLogin = async (values: any) => {
    const res = await commonRequest({
      method: "POST",
      url: "/auth/google",
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center pt-4">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          googleLogin(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleAuth;
