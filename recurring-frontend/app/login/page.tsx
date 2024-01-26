import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";
import Recurring from "@/components/common/Recurring";
import Logo from "../../public/img/logo.png";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { checkUser } from "@/server/checkUser";
import GoogleAuth from "@/components/common/GoogleAuth";

export default async function page() {
  await checkUser();

  return (
    <>
      <Navbar />
      <div className="lg:h-screen grid grid-cols-1 lg:grid-cols-2 mb-5">
        <div className="px-5 pt-20 lg:p-20 flex items-center">
          <div className="w-full lg:px-20">
            <div className="flex items-center gap-4 py-10">
              <Image
                alt="recurring"
                src={Logo}
                className="w-10 lg:w-16 h-10 lg:h-16"
              />
              <h1 className="font-bold text-5xl">
                <Recurring />
              </h1>
            </div>
            <div className="text-2xl font-bold py-3">Login</div>
            <LoginForm />
            <p className="py-5 text-primary text-center">
              <Link href="forget" className="hover:text-blue-400">
                Forgot Password?
              </Link>
            </p>

            <div className="flex items-center gap-3">
              <div className="h-[2px] w-full bg-backgroundAccent rounded-full"></div>
              <p>or</p>
              <div className="h-[2px] w-full bg-backgroundAccent rounded-full"></div>
            </div>

            <GoogleAuth />

            <p className="py-5">
              Don't Have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-blue-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-primary p-24">
          <p>
            This is your very own headline to describe your product or service.
          </p>
          <h1>This is a headline</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
