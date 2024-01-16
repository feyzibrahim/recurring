import Recurring from "./Recurring";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import Logo from "../img/logo.png";
import FooterForm from "./FooterForm";

export default function Footer() {
  return (
    <div className="px-5 lg:px-40 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="lg:py-16">
          <h1 className="text-5xl font-bold">
            What People are Saying About <Recurring />
          </h1>
          <p className="text-foregroundAccent py-5">
            Everything you need to manage and grow your company anywhere on
            planet
          </p>
          <h2 className="text-5xl">"</h2>
          <p>
            I am very helped by this recurring application, my days are very
            easy to use this application and its very helpful in my life , even
            I can pay a short time 😍
          </p>
          <p className="py-5 text-foregroundAccent">_ Feyz Ibrahim</p>
        </div>
        <FooterForm />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:py-20 py-5">
        <div className="py-5 col-span-2 grid grid-rows-3 gap-2">
          <div className="flex items-center gap-4">
            <Image alt="recurring" src={Logo} width={30} height={30} />
            <h1 className="font-bold text-2xl">
              <Recurring />
            </h1>
          </div>
          <p>Get started now try our product</p>
          <Input type="email" id="email" placeholder="Enter you email" />
        </div>
        <div className="col-span-2 lg:col-span-1 grid grid-rows-5">
          <h5 className="font-bold">Support</h5>
          <p className="hover-text">Help Center</p>
          <p className="hover-text">Account Information</p>
          <p className="hover-text">About</p>
          <p className="hover-text">Contact Us</p>
        </div>
        <div className="col-span-2 lg:col-span-1 grid grid-rows-5">
          <h5 className="font-bold">Help and Support</h5>
          <p className="hover-text">Talk to Support</p>
          <p className="hover-text">Support Docs</p>
          <p className="hover-text">System Status</p>
          <p className="hover-text">Covid response</p>
        </div>
        <div className="grid grid-rows-5">
          <h5 className="font-bold">Product</h5>
          <p className="hover-text">Update</p>
          <p className="hover-text">Security</p>
          <p className="hover-text">Beta Test</p>
          <p className="hover-text">Pricing Product</p>
        </div>
      </div>

      <div className="lg:flex justify-between pb-5">
        <p>© 2022 recurring PVT LT. Copyright and rights reserved</p>
        <p>
          <span className="hover-text">Terms and Conditions</span> ·{" "}
          <span className="hover-text">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
