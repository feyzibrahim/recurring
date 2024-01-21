"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "../../public/img/logo.png";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export function FooterForm() {
  const { toast } = useToast();

  return (
    <div className="p-5 lg:p-16 bg-backgroundAccent rounded-xl flex flex-col gap-4">
      <Image
        alt="recurring"
        src={Logo}
        width={40}
        height={40}
        className="mx-auto"
      />

      <h3 className="text-center">Get Started</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast({
            title: "Thanks for sending a message",
            description: "Our team will get back to you as soon as possible",
          });
        }}
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter you email" />
        </div>

        <div className="py-3">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="What you want to say?"
            className="h-32"
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
}
