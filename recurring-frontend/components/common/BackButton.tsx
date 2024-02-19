"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button variant="secondary" onClick={() => router.back()}>
      Cancel
    </Button>
  );
};

export default BackButton;
