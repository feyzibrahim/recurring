"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../public/img/logo.png";
import Recurring from "./Recurring";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { BiMenu } from "react-icons/bi";

const Hamburger = () => {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="lg:hidden text-2xl">
          <BiMenu />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-4">
            <Image alt="recurring" src={Logo} width={30} height={30} />
            <h1 className="font-bold text-2xl">
              <Recurring />
            </h1>
          </div>
        </SheetHeader>
        <div className="grid gap-3 py-2 pt-12">
          <SheetClose asChild>
            <Link
              href={"/"}
              className={`p-2 rounded hover-text ${
                pathName === "/" ? " bg-backgroundAccent" : ""
              }`}
            >
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/contact"}
              className={`p-2 rounded hover-text ${
                pathName === "/contact" ? " bg-backgroundAccent" : ""
              }`}
            >
              Contact Us
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/blog"}
              className={`p-2 rounded hover-text ${
                pathName === "/blog" ? " bg-backgroundAccent" : ""
              }`}
            >
              Blog
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/about"}
              className={`p-2 rounded hover-text ${
                pathName === "/about" ? " bg-backgroundAccent" : ""
              }`}
            >
              About Us
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/testimonials"}
              className={`p-2 rounded hover-text ${
                pathName === "/testimonials" ? " bg-backgroundAccent" : ""
              }`}
            >
              Testimonials
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/login"}
              className={`p-2 rounded hover-text ${
                pathName === "/login" ? " bg-backgroundAccent" : ""
              }`}
            >
              Login
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/register"}
              className={`p-2 rounded hover-text ${
                pathName === "/register" ? " bg-backgroundAccent" : ""
              }`}
            >
              Sign Up
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Hamburger;
