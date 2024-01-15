import Recurring from "./Recurring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "../img/logo.png";

export default function Footer() {
  return (
    <div className="px-5 lg:px-40 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <h1>
            People are Saying About <Recurring />
          </h1>
          <p>
            Everything you need to manage and grow your company anywhere on
            planet
          </p>
          <h2>"</h2>
          <p>
            I am very helped by this recurring application, my days are very
            easy to use this application and its very helpful in my life , even
            I can pay a short time 😍
          </p>
          <p>_ Feyz Ibrahim</p>
        </div>
        <div className="px-10 lg:px-20 py-10 bg-backgroundAccent rounded-xl flex flex-col gap-4">
          <Image
            alt="recurring"
            src={Logo}
            width={40}
            height={40}
            className="mx-auto"
          />

          <h3 className="text-center">Get Started</h3>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter you email" />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Input
              type="text"
              id="message"
              placeholder="What you want to say?"
            />
          </div>

          <Button>Send Message</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 py-10">
        <div className="py-5 col-span-2">
          <div className="flex items-center gap-4">
            <Image alt="recurring" src={Logo} width={30} height={30} />
            <h1 className="font-bold text-2xl">
              <Recurring />
            </h1>
          </div>
          <p>Get started now try our product</p>
          <Input type="email" id="email" placeholder="Enter you email" />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <h5 className="font-bold">Support</h5>
          <p>Help Center</p>
          <p>Account Information</p>
          <p>About</p>
          <p>Contact Us</p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <h5 className="font-bold">Help and Support</h5>
          <p>Talk to Support</p>
          <p>Support Docs</p>
          <p>System Status</p>
          <p>Covid response</p>
        </div>
        <div>
          <h5 className="font-bold">Product</h5>
          <p>Update</p>
          <p>Security</p>
          <p>Beta Test</p>
          <p>Pricing Product</p>
        </div>
      </div>

      <div className="lg:flex justify-between pb-5">
        <p>© 2022 recurring PVT LT. Copyright and rights reserved</p>
        <p>Terms and Conditions . Privacy Policy</p>
      </div>
    </div>
  );
}
