import Image from "next/image";
import Logo from "../img/logo.png";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import Recurring from "./Recurring";

function Navbar() {
  return (
    <nav className="flex justify-between px-5 lg:px-40 py-3 bg-backgroundAccent shadow-md fixed w-full">
      <div className="flex items-center gap-4">
        <Image alt="recurring" src={Logo} width={30} height={30} />
        <h1 className="font-bold text-2xl">
          <Recurring />
        </h1>
      </div>
      <div className="gap-5 items-center flex">
        <div className="hidden lg:flex gap-5">
          <Link href={"/"} className="hover-text">
            Home
          </Link>
          <Link href={"/contact"} className="hover-text">
            Contact Us
          </Link>
          <Link href={"/blog"} className="hover-text">
            Blog
          </Link>
          <Link href={"/about"} className="hover-text">
            About Us
          </Link>
          <Link href={"/testimonials"} className="mr-10 hover-text">
            Testimonials
          </Link>
        </div>
        <Link href={"/login"} className="hover-text">
          Login
        </Link>
        <Button asChild>
          <Link href={"/register"}>Sign Up</Link>
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
