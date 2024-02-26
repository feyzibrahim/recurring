import React from "react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import Recurring from "@/components/common/Recurring";
import Logo from "@/public/img/logo.png";
import Link from "next/link";
import BgImage from "@/public/Register.png";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import GoogleAuth from "@/components/common/GoogleAuth";

export default async function page() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-5">
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
            <div className="text-2xl font-bold py-3">Sign Up</div>
            <RegisterForm />

            <div className="flex items-center gap-3 mt-10">
              <div className="h-[2px] w-full bg-backgroundAccent rounded-full"></div>
              <p>or</p>
              <div className="h-[2px] w-full bg-backgroundAccent rounded-full"></div>
            </div>
            <GoogleAuth />
            <p className="py-5">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-blue-400">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full">
          <Image
            alt="Bg Image"
            src={BgImage}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
