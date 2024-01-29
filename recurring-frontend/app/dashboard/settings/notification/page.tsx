"use client";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

const page = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleEmailToggle = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handlePushToggle = () => {
    setPushNotifications(!pushNotifications);
  };

  return (
    <div className="md:px-10 md:py-5 w-full">
      <Label>
        <p className="pt-5">Notifications</p>
      </Label>
      <p className="text-sm text-foregroundAccent md:w-1/2 py-2">
        You can turn of notifications at any time you wan't just click on the
        below checkbox. If you wan't to keep getting notifications please don't
        turn of below.
      </p>
      <div className="flex items-center my-4">
        <input
          type="checkbox"
          id="emailNotifications"
          checked={emailNotifications}
          onChange={handleEmailToggle}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="emailNotifications" className="ml-2 text-foreground">
          Receive Email Notifications
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="pushNotifications"
          checked={pushNotifications}
          onChange={handlePushToggle}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="pushNotifications" className="ml-2 text-foreground">
          Receive Push Notifications
        </label>
      </div>
    </div>
  );
};

export default page;
