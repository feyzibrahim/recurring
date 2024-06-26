"use client";
import Image from "next/image";
import Logo from "../../public/img/logo.png";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import Recurring from "./Recurring";
import Hamburger from "./Hamburger";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="flex justify-between px-5 lg:px-40 py-3 bg-backgroundAccent shadow-md fixed w-full z-50">
      <div className="flex items-center gap-4">
        <Image alt="recurring" src={Logo} width={30} height={30} />
        <h1 className="font-bold text-2xl">
          <Recurring />
        </h1>
      </div>
      <div className="gap-5 items-center flex">
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href={"/"}
            className={`hover-text ${pathName === "/" && "font-bold"}`}
          >
            Home
          </Link>
          <Link
            href={"/contact"}
            className={`hover-text ${pathName === "/contact" && "font-bold"}`}
          >
            Contact Us
          </Link>
          <Link
            href={"/blog"}
            className={`hover-text ${pathName === "/blog" && "font-bold"}`}
          >
            Blog
          </Link>
          <Link
            href={"/about"}
            className={`hover-text ${pathName === "/about" && "font-bold"}`}
          >
            About Us
          </Link>
          <Link
            href={"/testimonials"}
            className={`hover-text ${
              pathName === "/testimonials" && "font-bold"
            }`}
          >
            Testimonials
          </Link>
          <Link
            href={"/login"}
            className={`hover-text ${pathName === "" && "font-bold"}`}
          >
            Login
          </Link>
          <Button asChild>
            <Link href={"/register"}>Sign Up</Link>
          </Button>
        </div>
        <ThemeToggle />
        <Hamburger />
      </div>
    </nav>
  );
}

export default Navbar;
