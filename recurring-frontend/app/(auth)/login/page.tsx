import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";
import Recurring from "@/components/common/Recurring";
import Logo from "@/public/img/logo.png";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import GoogleAuth from "@/components/common/GoogleAuth";
import BgImage from "@/public/login-bg.jpg";
import CheckUserExist from "@/components/common/CheckUserExist";

export default async function page() {
  return (
    <>
      <CheckUserExist />
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
              <Link href="/forgot-password" className="hover:text-primary">
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
              Don&apos;t Have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full h-screen overflow-clip relative">
          <div className="absolute top-1/3 text-center">
            <p className="text-2xl">Nice to see you again</p>
            <h1 className="text-6xl py-5 font-black">Welcome back</h1>
            <div className="flex items-center justify-center pb-5">
              <div className="w-10 h-2 bg-foreground rounded-full"></div>
            </div>
            <p className="w-1/2 mx-auto text-sm">
              Let&apos;s make your work more organize and easily using the
              recurring Dashboard with many of the latest features in managing
              work every day.
            </p>
          </div>
          <Image alt="Bg Image" src={BgImage} />
        </div>
      </div>
      <Footer />
    </>
  );
}
