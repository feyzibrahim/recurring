"use client";

import { actualCommonRequest } from "@/api/actual_client";
import { clientRequestWithRefreshToken } from "@/api/client_request_with_refresh_token";
import { EmployeeTypes } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import { deleteObject, getObject, storeObject } from "@/util/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckUserExist = () => {
  const router = useRouter();
  let user: EmployeeTypes | null = getObject("user_data");

  const newToken = async () => {
    const res = await clientRequestWithRefreshToken({
      route: API_ROUTES.AUTH,
      method: "GET",
      url: "/api/user/new-token",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      deleteObject("user_data");
      user = null;
    }

    if (res.success) {
      storeObject("user_data", {
        ...res.user,
        access_token: res.access_token,
        refresh_token: res.refresh_token,
      });

      if (res.user.role === "owner") {
        router.replace("/dashboard");
      }
      if (res.user.role === "employee") {
        router.replace("/home");
      }
      if (res.user.role === "manager") {
        router.replace("/man");
      }
      if (res.user.role === "super-admin") {
        router.replace("/super-admin");
      }
    }
  };

  const loadUser = async () => {
    const res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "GET",
      url: "/api/user",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.success) {
      if (user) {
        if (user.role === "owner") {
          router.replace("/dashboard");
        }
        if (user.role === "employee") {
          router.replace("/home");
        }
        if (user.role === "manager") {
          router.replace("/man");
        }
        if (user.role === "super-admin") {
          router.replace("/super-admin");
        }
      }
      return;
    }
    if (!res.success) {
      if (user) {
        newToken();
      } else {
        deleteObject("user_data");
        user = null;
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (user) {
    if (user.role === "owner") {
      router.replace("/dashboard");
    }
    if (user.role === "employee") {
      router.replace("/home");
    }
    if (user.role === "manager") {
      router.replace("/man");
    }
    if (user.role === "super-admin") {
      router.replace("/super-admin");
    }
  }

  return <></>;
};

export default CheckUserExist;
