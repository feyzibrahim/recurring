"use client";
import { useState } from "react";

const NotificationForm = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleEmailToggle = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handlePushToggle = () => {
    setPushNotifications(!pushNotifications);
  };

  return (
    <>
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
    </>
  );
};

export default NotificationForm;
