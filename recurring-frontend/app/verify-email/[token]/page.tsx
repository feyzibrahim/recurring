"use client";
import { commonRequest } from "@/api/client";
import RecurringVertical from "@/components/common/RecurringVertical";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const page = ({ params }: { params: { token: string } }) => {
  useEffect(() => {
    commonRequest({
      method: "GET",
      url: `/auth/verify-email/${params.token}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Head>
        <title>Email Verification Success</title>
        <meta
          name="description"
          content="Your email has been successfully verified."
        />
      </Head>

      <div className="bg-backgroundAccent p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <RecurringVertical
          size={25}
          fontSize="text-2xl"
          styling="mb-6 justify-center"
        />
        <h1 className="text-4xl font-semibold mb-4 text-green-400">
          Email Verified!
        </h1>
        <p className="mb-6">
          Your email has been successfully verified. Welcome to Recurring App!
        </p>
        <Link href="/dashboard">
          <Button className="hover:underline">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
