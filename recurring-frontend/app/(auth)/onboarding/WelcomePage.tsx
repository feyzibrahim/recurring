"use client";
import Recurring from "@/components/common/Recurring";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserDetails from "./UserDetails";
import OrganizationDetails from "./OrganizationDetails";
import OrganizationAddress from "./OrganizationAddress";

const WelcomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 4;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      console.log("Onboarding completed!");
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-8">
        Welcome to <Recurring />
      </h1>
      <div className="bg-backgroundAccent rounded-lg shadow-lg p-8 max-w-md w-full">
        {currentPage === 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 1: Get Started</h2>
            <p>
              Welcome to <Recurring />! Let&apos;s get started.
            </p>
          </div>
        )}
        {currentPage === 1 && <UserDetails handleNext={handleNext} />}
        {currentPage === 2 && <OrganizationDetails handleNext={handleNext} />}
        {currentPage === 3 && <OrganizationAddress />}
      </div>
      <div className="flex mt-8 gap-2">
        {currentPage !== 0 && (
          <Button onClick={handlePrev} variant="outline">
            Back
          </Button>
        )}
        {currentPage === 0 && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
  );
};

export default WelcomePage;
